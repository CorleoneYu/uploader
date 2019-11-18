import { Task } from './index';

export class Uploader {
  public tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task);
  }

  cancelTask(taskId: number) {
    const idx = this.tasks.findIndex((task) => task.taskId === taskId);
    this.tasks.splice(idx, 1);
  }
}