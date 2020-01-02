import { FileUpload, Directory } from './index';

export class TaskNode {
  public origin: FileUpload | Directory;
  constructor(origin: FileUpload | Directory) {
    this.origin = origin;
  }
}
