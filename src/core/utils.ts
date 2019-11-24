import { FileUpload, Directory, Task, Uploader } from "./index";

export const getSingleUploader = _getSingleUploaderCreater();

export function createTask(fileList: File[]) {
  const task = new Task();
  createFileTree(fileList, task);
  console.log('task', task);
  return task;
}

export function createFileTree(fileList: File[], task: Task) {
  const root = {
    subDirs: [],
  }
  for(let file of fileList) {
    createFileNode(file, root, task);
  }

  task.root = root.subDirs[0];
  return root.subDirs;
}

export function createFileNode(file: File, root: any, task: Task) {
  const pathAry = (file as any).webkitRelativePath.split('/');
  pathAry.pop();
  const pathLen = pathAry.length;

  let parent = root;
  for (let i = 0; i < pathLen; i++) {
    const targetName = pathAry[i];
    const subDirs = parent.subDirs;

    let isFind = false;
    for (let j = 0; j < subDirs.length; j++) {
      if (subDirs[j].name === targetName) {
        parent = subDirs[j];
        isFind = true;
      }
    }

    if (!isFind) {
      const dir = new Directory({
        task,
        parentDir: parent,
        name: targetName,
      });
      (parent as Directory).subDirs.push(dir);
      task.taskLink.push(dir);
      parent = dir;
    }
  }

  const fileUpload = new FileUpload({
    file,
    task,
    parentDir: parent,
  });

  (parent as Directory).subFiles.push(fileUpload);
  task.taskLink.push(fileUpload);
}

export const TIMEOUT = 1000;

export function mockRequest(timeout: number = TIMEOUT) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, timeout);
  })
}

function _getSingleUploaderCreater() {
  let singleUploader: Uploader | null = null;
  return function() {
    if (singleUploader) {
      return singleUploader;
    }

    singleUploader = new Uploader();
    return singleUploader;
  }
}