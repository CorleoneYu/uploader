import { Task } from '../../../../../core';
import { ITaskUI } from './reducer';

export function task2UITask(task: Task): ITaskUI {
  const { taskId, name, size, uploadedSize, taskStatus, progress } = task;
  return {
    progress,
    taskId,
    name,
    size,
    uploadedSize,
    status: taskStatus,
  }
}