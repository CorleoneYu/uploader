import { FileUpload, Task, } from './index';

export class Directory {
  public name: string = '';
  public parentDir: Directory | null = null;
  public task: Task;
  public subFiles: FileUpload[] = [];
  public subDirs: Directory[] = [];
  
  constructor({ task, parentDir, name }: {
    task: Task,
    parentDir: Directory | null,
    name: string
  }) {
    this.task = task;
    this.parentDir = parentDir;
    this.name = name;
  }
}