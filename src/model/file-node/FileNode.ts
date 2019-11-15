let fileId = 1;

export default class FileNode {
  fileId: number;
  fileName: string;
  createDate: string = '';
  size: number;
  fileType: string = 'txt';
  isFile: boolean;
  children: FileNode[];

  constructor({fileName, size, isFile, children = []}: {
    fileName: string,
    size: number,
    isFile: boolean,
    children: FileNode[]
  }) {
    this.fileId = fileId++;
    this.fileName = fileName;
    this.size = size;
    this.isFile = isFile;
    this.children = children;
  }
}