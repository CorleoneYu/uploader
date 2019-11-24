import { Task } from './index';

export class Uploader {
  public tasks: Map<number, Task> = new Map();

  addTask(task: Task) {
    this.tasks.set(task.taskId, task);
  }

  cancelTask(taskId: number) {
    if (!this.tasks.get(taskId)) {
      return;
    }

    this.tasks.delete(taskId);
  }

  upload(taskId: number) {
    if (!this.tasks.get(taskId)) {
      return;
    }

    this.tasks.get(taskId)!.upload();
  }
}