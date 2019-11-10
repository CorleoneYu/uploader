import { FileUpload, Directory } from "./index";

export function createFile(num: number) {
  const fileFactory = _createFileObjFactory();

  const res: FileUpload[] = [];
  for (let i = 0; i < num; i++) {
    const fileObj = fileFactory() as File;
    res.push(new FileUpload({ file: fileObj, task: null, parentDir: null }));
  }

  return res;
}

export function createDir(num: number) {
  const res: Directory[] = [];
  for (let i = 1; i <= num; i++) {
    res.push(new Directory({ task: null, parentDir: null, name: `dir-${i}`}));
  }

  return res;
}

function _createFileObjFactory() {
  let fileId = 1;
  let fileMock = {
    name: `file-${fileId}`,
    type: "file",
    size: fileId
  };

  function updateFileMock() {
    fileId++;
    fileMock.name = `file-${fileId}`;
    fileMock.type = "file";
    fileMock.size = fileId;
  }

  return function() {
    updateFileMock();
    return fileMock;
  };
}
