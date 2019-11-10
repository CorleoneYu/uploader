import { FileUpload, Task, } from './index';

let dirId = 1;
export class Directory {
  public dirId: string;
  public name: string = '';
  public parentDir: Directory | null = null;
  public task: Task | null;
  public subFiles: FileUpload[] = [];
  public subDirs: Directory[] = [];
  
  constructor({ task, parentDir, name }: {
    task: Task | null,
    parentDir: Directory | null,
    name: string
  }) {
    this.dirId = `dir-${dirId++}`;
    this.task = task;
    this.parentDir = parentDir;
    this.name = name;
  }
}