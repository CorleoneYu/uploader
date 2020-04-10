import { FileUpload, Task } from './index';
import useFileMapModel from '../model/fileMap';

export type DirStatus = 'init' | 'uploaded';

const createFolder = useFileMapModel.data!.createFolder;

let dirId = 1;
export default class Directory {
  public dirId: string;
  public name: string = '';
  public path: string = '';
  public parentDir: Directory | null = null;
  public task: Task;
  public subFiles: FileUpload[] = [];
  public subDirs: Directory[] = [];
  public dirStatus: DirStatus = 'init';

  constructor({
    task,
    parentDir,
    name,
    path,
  }: {
    task: Task;
    parentDir: Directory | null;
    name: string;
    path: string;
  }) {
    this.dirId = `dir-${dirId++}`;
    this.task = task;
    this.parentDir = parentDir;
    this.name = name;
    this.path = path;
  }

  async upload(): Promise<boolean> {
    console.log('directory upload', this.name);

    try {
      await createFolder(this.name, this.path);
      this.dirStatus = 'uploaded';
      return true;
    } catch (e) {
      console.log('dir upload err', e);
      return false;
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
