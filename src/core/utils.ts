import { FileUpload, Directory, Task, Uploader } from './index';

export const getSingleUploader = _getSingleUploaderCreater();

export function createFileTask(fileList: File[], path: string): Task[] {
  console.log('createFileTask -> fileList', fileList);
  const tasks: Task[] = [];

  for (let file of fileList) {
    const task = new Task(path);
    const fileUpload = new FileUpload({
      file,
      task,
      path,
      type: file.type,
      name: file.name,
      parentDir: null,
    });
    task.taskLink.push(fileUpload);
    task.root = fileUpload;
    tasks.push(task);
  }

  console.log('tasks', tasks);
  return tasks;
}

export function createDirTask(fileList: File[], path: string) {
  const task = new Task(path);
  createFileTree(fileList, task);
  console.log('task', task);
  return task;
}

export function createFileTree(fileList: File[], task: Task) {
  // 为了好写 所以 mock 写的 root
  // 其实不是 dir 或 file
  // 只是一个简单的对象
  const root = {
    subDirs: [],
    path: task.path,
  };
  for (let file of fileList) {
    createFileNode(file, root, task);
  }

  task.root = root.subDirs[0];
  return root.subDirs;
}

export function createFileNode(file: File, root: any, task: Task) {
  // 只有文件夹才有 webkitRelativePath
  // 现在只有 上传文件夹功能
  // TODO: 兼容上传文件
  const pathAry = (file as any).webkitRelativePath.split('/');
  console.log('pathAry: ', pathAry);
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
        break;
      }
    }

    let path = parent.path;
    if (parent.name) {
      // 如果 parent 为 root 时 root.name 为空
      path += `/${parent.name}`;
    }

    if (!isFind) {
      const dir = new Directory({
        task,
        path,
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
    path: `${parent.path}/${parent.name}`,
    parentDir: parent,
    type: file.type,
    name: file.name,
  });

  (parent as Directory).subFiles.push(fileUpload);
  task.taskLink.push(fileUpload);
}

export const TIMEOUT = 1000;

export function mockRequest(timeout: number = TIMEOUT) {
  console.log('sleep: ', timeout);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, timeout);
  });
}

function _getSingleUploaderCreater() {
  let singleUploader: Uploader | null = null;
  return function () {
    if (singleUploader) {
      return singleUploader;
    }

    singleUploader = new Uploader();
    return singleUploader;
  };
}
