import { Task } from './index';

export class Uploader {
  public tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task);
  }

  cancelTask(taskId: string) {
    
  }
}