import { useRef, useCallback } from 'react';
import { createFileTask, getSingleUploader, Uploader } from '../../../core';

/**
 * 处理 uploader 对应的 UI 数据
 */
function useUploader() {
  const uploaderRef = useRef<Uploader>(getSingleUploader());

  const handleFileChange = useCallback((event: any) => {
    const task = createFileTask(event.target.files, '我的文件');
    const uploader = uploaderRef.current;
    uploader.addTask(task);
    uploader.upload(task.taskId);
  }, []);

  return {
    handleFileChange,
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
