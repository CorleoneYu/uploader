import { Task } from './index';

export default class Uploader {
  public tasks: Map<string, Task> = new Map();

  addTask(tasks: Task[]) {
    tasks.forEach(task => {
      this.tasks.set(task.taskId, task);
    })
  }

  cancelTask(taskId: string) {
    if (!this.tasks.get(taskId)) {
      return;
    }

    this.tasks.delete(taskId);
  }

  upload(taskIds: string[]) {
    taskIds.forEach(taskId => {
      if (!this.tasks.get(taskId)) {
        return;
      }
  
      this.tasks.get(taskId)!.upload(true);
    })
  }
}
