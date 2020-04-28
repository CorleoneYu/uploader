import { useRef, useCallback, useReducer, useEffect, useMemo } from 'react';
import { createFileTask, getSingleUploader, Uploader, Task, TaskStatus } from '../../../../core';
import { EVENTS, eventEmitter } from '../../../../event';
import reducer, { initialState } from './reducer/reducer';
import { addTasks, updateTask } from './reducer/action';

export interface IUploader {
  total: number; // 总共的任务数量
  done: number; // 已完成的任务数量
  status: TaskStatus; // 根据 tasks 计算得出 status
}

/**
 * 处理 uploader 对应的 UI 数据
 */
function useUploader() {
  const uploaderRef = useRef<Uploader>(getSingleUploader());
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFileChange = useCallback((event: any) => {
    const tasks = createFileTask(event.target.files, '我的文件');
    const taskIds = tasks.map((task) => task.taskId);
    const uploader = uploaderRef.current;

    // 逻辑uploader
    uploader.addTask(tasks);
    uploader.upload(taskIds);

    // ui uploader
    dispatch(addTasks(tasks));
  }, []);

  const handleUpdateTask = useCallback((task: Task) => {
    dispatch(updateTask(task));
  }, []);

  useEffect(() => {
    eventEmitter.on(EVENTS.UPDATE_TASK, handleUpdateTask);
  }, [handleUpdateTask]);

  const uploader: IUploader = useMemo(() => {
    const { tasks } = state;
    const doneTasks = tasks.filter(task => task.status === 'success');
    const total = tasks.length;
    const done = doneTasks.length;

    return {
      total,
      done,
      // TODO: 补充暂停、错误状态
      status: done === total ? 'success' : 'uploading',
    }
  }, [state]);

  return {
    handleFileChange,
    state,
    uploader,
    dispatch,
  };
}

export default useUploader;

// 文件夹相关
// const createInput = useCallback(() => {
//   if (inputDomRef.current) {
//     return inputDomRef.current;
//   }

//   const inputEl = document.createElement('input');
//   inputEl.setAttribute('type', 'file');
//   inputEl.setAttribute('webkitdirectory', 'webkitdirectory');
//   inputEl.style.display = 'none';
//   inputEl.addEventListener('change', handleFileChange);
//   inputDomRef.current = inputEl;
//   return inputEl;
// }, [handleFileChange]);
