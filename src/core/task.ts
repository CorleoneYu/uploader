import { FileUpload, Directory } from './index';

let taskId = 0;

export class Task {
  public taskId: number = 0;
  public root: FileUpload | Directory;

  constructor(root: FileUpload | Directory) {
    this.taskId = taskId++;
    this.root = root;
  }
}