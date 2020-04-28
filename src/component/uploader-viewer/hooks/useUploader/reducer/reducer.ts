import { IAction, ACTION_TYPE } from './action';
import { Task, TaskStatus } from '../../../../../core';
import { task2UITask } from './utils';

// 这里将 Task 翻译成 UI 所需要使用的字段
// 例如：task 的 root 的 name progress status size
export interface ITaskUI {
  taskId: string;
  name: string;
  size: number;
  uploadedSize: number;
  status: TaskStatus;
}

export interface IUploaderUI {
  tasks: ITaskUI[];
}

const mockTask: ITaskUI = {
  taskId: 'task-1',
  name: 'test',
  size: 1054,
  uploadedSize: 256,
  status: 'uploading',
}

export const initialState: IUploaderUI = {
  tasks: [],
  // tasks: [mockTask],
};

export default function reducer(state: IUploaderUI, action: IAction) {
  switch (action.type) {
    case ACTION_TYPE.ADD_TASKS:
      return addTasks(action.payload.tasks, state);

    case ACTION_TYPE.DELETE_TASKS:
      return state;

    case ACTION_TYPE.UPDATE_TASK:
      return updateTask(action.payload.task, state);
      
    default:
      return state;
  }
}

function addTasks(tasks: Task[], state: IUploaderUI): IUploaderUI {
  const newTasks = (tasks as Task[]).map((task) => task2UITask(task));
  return {
    tasks: [...state.tasks, ...newTasks],
  };
}

function updateTask(task: Task, state: IUploaderUI): IUploaderUI {
  const { tasks } = state;
  console.log('updateTask: ', task.taskId, tasks);
  const targetIdx =  tasks.findIndex((item) => item.taskId === task.taskId);

  if (targetIdx === -1) {
    return state;
  }

  tasks[targetIdx] = task2UITask(task);
  console.log('updateTask: ', tasks);
  return {
    tasks: [...tasks],
  }
}