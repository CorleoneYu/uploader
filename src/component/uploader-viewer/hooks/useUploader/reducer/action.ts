import { Task } from '../../../../../core';

export enum ACTION_TYPE {
  'ADD_TASKS' = 'ADD_TASKS',
  'DELETE_TASKS' = 'DELETE_TASKS',
  'UPDATE_TASK' = 'UPDATE_TASK',
}

export interface IAction {
  type: ACTION_TYPE;
  payload: any;
}

export function addTasks(tasks: Task[]): IAction {
  return {
    type: ACTION_TYPE.ADD_TASKS,
    payload: { tasks },
  };
}

export function deleteTasks(taskIds: string[]): IAction {
  return {
    type: ACTION_TYPE.DELETE_TASKS,
    payload: { taskIds },
  };
}

export function updateTask(task: Task): IAction {
  return {
    type: ACTION_TYPE.UPDATE_TASK,
    payload: { task },
  }
}