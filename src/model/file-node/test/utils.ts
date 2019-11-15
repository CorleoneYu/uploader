import FileNode from '../FileNode';

export function createFileNode(count: number, isFile: boolean) {
  const res: FileNode[] = [];
  for (let i = 0; i < count; i++) {
    res.push(new FileNode({
      fileName: isFile ? `file-${i + 1}` : `dir-${i + 1}`,
      size: i + 1,
      isFile,
      children: [],
    }));
  };

  return res;
}