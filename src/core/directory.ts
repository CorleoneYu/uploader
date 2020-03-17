import { FileUpload, Task, mockRequest } from './index';

export type DirStatus = 'init' | 'uploaded';

let dirId = 1;
export default class Directory {
  public dirId: string;
  public name: string = '';
  public parentDir: Directory | null = null;
  public task: Task;
  public subFiles: FileUpload[] = [];
  public subDirs: Directory[] = [];
  public dirStatus: DirStatus = 'init';

  constructor({
    task,
    parentDir,
    name,
  }: {
    task: Task;
    parentDir: Directory | null;
    name: string;
  }) {
    this.dirId = `dir-${dirId++}`;
    this.task = task;
    this.parentDir = parentDir;
    this.name = name;
  }

  async upload() {
    console.log('directory upload', this.name);

    try {
      await mockRequest();
      this.dirStatus = 'uploaded';
    } catch (e) {
      console.log('dir upload err', e);
    }
  }

  // 可以跟 fileUpload 提公共方法
  isTaskPaused() {
    return this.task.isPaused();
  }

  isUploaded() {
    return this.dirStatus === 'uploaded';
  }
}
