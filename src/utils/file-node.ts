const FOLDER_ID = -1;

export default interface IFileNode {
  fileId: number;
  fileName: string;
  size: number;
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
}

export function formatFileNode(fileNode: any): IFileNode {
  const children = fileNode.children || [];

  return {
    fileId: fileNode.fileId || FOLDER_ID,
    fileName: fileNode.fileName,
    size: fileNode.size,
    type: fileNode.type || '',
    isFile: fileNode.file,
    isCopy: fileNode.copy,
    isReadOnly: fileNode.readOnly,
    _createDate: fileNode.createDate,
    _modifyDate: fileNode.modifyDate,
    _readDate: fileNode.readDate,
    createDate: formatTime(fileNode.createDate),
    modifyDate: formatTime(fileNode.modifyDate),
    readDate: formatTime(fileNode.readDate),
    children: children.map((child: any) => formatFileNode(child)),
  };
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
