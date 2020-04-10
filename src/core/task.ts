import { FileUpload, Directory } from './index';
export type FileTree = FileUpload | Directory;
export type TaskStatus = 'paused' | 'uploading' | 'success';
let taskId = 1;

export default class Task {
  public taskId: number;
  public root: FileUpload | Directory | null = null;
  public path: string = '';
  public taskLink: FileTree[] = [];
  // todo 状态机
  public taskStatus: TaskStatus = 'paused';
  public currentIdx = 0;

  constructor(path: string) {
    this.taskId = taskId++;
    this.path = path;
  }

  pause() {
    console.log('task pause');
    this.taskStatus = 'paused';
  }

  async upload() {
    if (this.taskStatus !== 'paused') {
      return;
    }

    console.log('task upload');
    this.taskStatus = 'uploading';

    const taskItem = this.taskLink[this.currentIdx];
    await taskItem.upload();
    // while (this.taskStatus === 'uploading' && !this.isFinish()) {
    //   const taskItem = this.taskLink[this.currentIdx];
    //   await taskItem.upload();

    //   if (taskItem.isUploaded()) {
    //     this.currentIdx++;
    //   }
    // }

    if (this.isFinish()) {
      this.taskStatus = 'success';
    }
  }

  isFinish() {
    return this.currentIdx >= this.taskLink.length;
  }

  isPaused() {
    return this.taskStatus === 'paused';
  }
}
