import { useState, useCallback } from 'react';
import { createModel } from 'hox';
import { Map } from 'immutable';
import useCurNodeKey from './curNodeKey';
import { formatSize, formatTime } from '../utils';
import { getFileTreeApi, deleteFileApi, createFolderApi } from '../api/file';
import { defaultKey } from '../constant';
const FOLDER_ID = -1;

export interface ImmutableMap<T> extends Map<string, any> {
  get<K extends keyof T>(name: K): T[K];
}

interface IFileNode {
  // 兼容 antd 数据结构
  key: string;
  title: string;
  isLeaf: boolean;

  fileId: number;
  fileName: string;
  _size: number;
  size: string;
  type: string;
  isFile: boolean;
  isCopy: boolean;
  isReadOnly: number;
  _createDate: number;
  _modifyDate: number;
  _readDate: number;
  createDate: string;
  modifyDate: string;
  readDate: string;
  childrenKey: string[];
  path: string;
}

export type IFileNodeMap = ImmutableMap<IFileNode>;

/**
 * fileMap
 * 整棵文件树（目录）打平成一个 map
 * 作为全局数据源 数据的修改都在这进行
 */
export function useFileMap() {
  const [fileMap, setFileMap] = useState<Map<string, IFileNodeMap>>(Map());

  // 拉取整棵文件目录 并 转换成 map
  const fetchFileMap = useCallback(async () => {
    const data = await getFileTreeApi();
    const rootMap = formatFileMap(data.data);
    setFileMap(rootMap);
    useCurNodeKey.data!.setCurNodeKey(defaultKey);
    return rootMap;
  }, []);

  // 删除文件(夹)
  const deleteFile = useCallback(
    async (fileNode: IFileNodeMap, path: string) => {
      await deleteFileApi(fileNode.get('fileName'), fileNode.get('path'));

      // 1. 更新对应父节点的 childrenKey 字段
      // path　即父节点 key
      const parentKey = path;
      let parentChildrenKey: string[] = fileMap.getIn([parentKey, 'childrenKey']);
      const idx = parentChildrenKey.indexOf(fileNode.get('key'));
      if (idx !== -1) {
        // 删除掉对应 key
        parentChildrenKey.splice(idx, 1);
      }
      let newFileMap = fileMap.setIn([parentKey, 'childrenKey'], parentChildrenKey);

      // 2. 删除 fileMap 对应的 key
      newFileMap = newFileMap.delete(fileNode.get('key'));

      // 3. 更新 fileMap
      setFileMap(newFileMap);
    },
    [fileMap]
  );

  // 新建文件夹
  const createFolder = useCallback(async (folderName: string, path: string) => {
    const data = await createFolderApi(folderName, path);

    setFileMap((fileMap) => {
      // 新文件夹 immutable
      const newFolder = _createFileMap(data.data);

      // 1. 新增 key
      let newFileMap = fileMap.set(newFolder.get('key'), newFolder);

      // 2. 更新对应父节点的 childrenKey 字段
      // path　即父节点 key
      const parentKey = path;
      let parentChildrenKey: string[] = fileMap.getIn([parentKey, 'childrenKey']);
      parentChildrenKey.push(newFolder.get('key'));
      newFileMap = newFileMap.setIn([parentKey, 'childrenKey'], parentChildrenKey);

      // 3. 更新 fileMap
      return newFileMap;
    });
  }, []);

  // 预览文件(夹)
  const previewNode = useCallback(
    (key: string) => {
      const fileNode = fileMap.get(key)!;
      useCurNodeKey.data!.setCurNodeKey(fileNode.get('key'));
    },
    [fileMap]
  );

  // TODO: 上传文件 prepare 阶段

  // TODO: 上传文件 sendChunks 阶段

  // TODO: 上传文件 finish 阶段

  return {
    fileMap,
    fetchFileMap,
    deleteFile,
    previewNode,
    createFolder,
  };
}

export default createModel(useFileMap);

/**
 * 格式化后台数据
 * @param fileNode 后台返回的目录数据
 * @return rootMap 全局数据源 model/fileMap tree 打平
 * @return rootTree 顶层map model/fileTree
 */
function formatFileMap(fileNode: any) {
  let map: Map<string, IFileNodeMap> = Map();

  function _formatFileNode(fileNode: any): string {
    const children = fileNode.children || [];

    let node: IFileNodeMap = _createFileMap(fileNode);
    node = node.set(
      'childrenKey',
      children.map((child: any) => _formatFileNode(child))
    );
    map = map.set(node.get('key'), node);
    return node.get('key');
  }

  _formatFileNode(fileNode);
  return map;
}

function _createFileMap(fileNode: any): IFileNodeMap {
  return Map({
    path: fileNode.path || '我的文件',
    fileId: fileNode.fileId || FOLDER_ID,
    fileName: fileNode.fileName,
    _size: fileNode.size,
    size: formatSize(fileNode.size),
    type: fileNode.type || '',
    isFile: fileNode.file,
    isCopy: fileNode.copy,
    isReadOnly: fileNode.readOnly,
    _createDate: fileNode.createDate,
    _modifyDate: fileNode.modifyDate,
    _readDate: fileNode.readDate,
    createDate: formatTime(fileNode.createDate * 1000),
    modifyDate: formatTime(fileNode.modifyDate * 1000),
    readDate: formatTime(fileNode.readDate * 1000),
    childrenKey: [],

    title: fileNode.fileName,
    key: fileNode.path ? `${fileNode.path}/${fileNode.fileName}` : `${fileNode.fileName}`,
    isLeaf: fileNode.file,
  });
}




