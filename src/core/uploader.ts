import { Task } from './index';
import { EVENTS, eventEmitter } from '../event';
export default class Uploader {
  public tasks: Map<string, Task> = new Map();

  constructor() {
    this.listenEvent();
  }

  listenEvent = () => {
    eventEmitter.on(EVENTS.UI_PAUSE_TASK, this.handlePauseTask);
    eventEmitter.on(EVENTS.UI_START_TASK, this.handleStartTask);
  }

  handlePauseTask = (taskId: string) => {
    console.log('handlePauseTask');
    const task = this.tasks.get(taskId);
    if (!task) {
      return;
    }

    task.pause();
    eventEmitter.emit(EVENTS.UPDATE_TASK, taskId);
  }

  handleStartTask = (taskId: string) => {
    console.log('handleStartTask');
    const task = this.tasks.get(taskId);
    if (!task) {
      return;
    }

    task.upload(true);
    eventEmitter.emit(EVENTS.UPDATE_TASK, taskId);
  }

  addTask = (tasks: Task[]) => {
    tasks.forEach(task => {
      this.tasks.set(task.taskId, task);
    })
  }

  cancelTask = (taskId: string) => {
    if (!this.tasks.get(taskId)) {
      return;
    }

    this.tasks.delete(taskId);
  }

  upload = (taskIds: string[]) => {
    taskIds.forEach(taskId => {
      if (!this.tasks.get(taskId)) {
        return;
      }
  
      this.tasks.get(taskId)!.upload(true);
    })
  }
}
