import { FileUpload, Directory } from './index';
export type FileTree = FileUpload | Directory;

let taskId = 1;

export class Task {
  public taskId: number;
  public root: FileUpload | Directory | null = null;
  public taskLink: FileTree[] = [];

  constructor() {
    this.taskId = taskId++;
  }
}
