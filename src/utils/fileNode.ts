const FOLDER_ID = -1;

export default interface IFileNode {
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
  children: Array<IFileNode>;
  path: string;
}

export function formatFileNode(fileNode: any, path = ''): IFileNode {
  const children = fileNode.children || [];

  let nextPath = path ? `${path}/${fileNode.fileName}` : `${fileNode.fileName}`;

  return {
    path,
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
    children: children.map((child: any) => formatFileNode(child, nextPath)),

    title: fileNode.fileName,
    key: `${path}/${fileNode.fileName}`,
    isLeaf: fileNode.file,
  };
}

export function findFileByPath(root: IFileNode, path: string): IFileNode | null {
  if (root.path === path) {
    return root;
  }

  const children = root.children;
  for (let i = 0; i < children.length; i++) {}
  return null;
}

function formatTime(time: number): string {
  const date = new Date(time);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() + ' ';
  const h = date.getHours() + ':';
  const m = date.getMinutes() + ':';
  const s = date.getSeconds();

  return Y + M + D + h + m + s;
}

export function formatSize(bytes: number) {
  var symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var exp = Math.floor(Math.log(bytes) / Math.log(2));
  if (exp < 1) {
    exp = 0;
  }
  var i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);

  let str = '';
  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    str = bytes.toFixed(2);
  }

  if (!str) {
    return '空';
  }

  return str + ' ' + symbols[i];
}
