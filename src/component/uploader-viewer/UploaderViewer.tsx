import React, { useState, useRef, useCallback } from 'react';
import { createDirTask, createFileTask, getSingleUploader, Uploader, Task } from '../../core';

/* antd */
import { Button } from 'antd';

interface IState {
  tasks: Task[];
}

function UploaderViewer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);
  const inputDomRef = useRef<HTMLInputElement | null>(null);
  const uploaderRef = useRef<Uploader>(getSingleUploader());

  // const handleFileChange = useCallback(
  //   (event: any) => {
  //     const task = createDirTask(event.target.files, '我的文件');
  //     const uploader = uploaderRef.current;
  //     uploader.addTask(task);
  //     uploader.upload(task.taskId);
  //     setTasks((oldTasks: Task[]) => [...oldTasks, task]);
  //   },
  //   [setTasks]
  // );

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

  const handleFileChange = useCallback((event: any) => {
    const task = createFileTask(event.target.files, '我的文件');
    const uploader = uploaderRef.current;
    uploader.addTask(task);
    uploader.upload(task.taskId);
    setTasks((oldTasks: Task[]) => [...oldTasks, task]);
  }, []);

  const createInput = useCallback(() => {
    if (inputDomRef.current) {
      return inputDomRef.current;
    }

    const inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'file');
    inputEl.style.display = 'none';
    inputEl.addEventListener('change', handleFileChange);
    console.log('createInput -> Event', Event);
    inputDomRef.current = inputEl;
    return inputEl;
  }, [handleFileChange]);

  const handleClick = useCallback(() => {
    if (!inputBoxRef.current) {
      return;
    }

    const inputDom = createInput();
    inputBoxRef.current.appendChild(inputDom);
    inputDom.click();
  }, [createInput]);

  const toggle = useCallback((task: Task) => {
    console.log('task togglePause', task);
    if (task.taskStatus === 'paused') {
      task.upload();
    } else if (task.taskStatus === 'uploading') {
      task.pause();
    }
  }, []);

  return (
    <div>
      <p>upload viewer</p>
      <div className="inputBox" ref={inputBoxRef}>
        <Button onClick={handleClick}>选择文件夹</Button>
      </div>
      {tasks.map((task: Task) => {
        return (
          <div key={`task-${task.taskId}`}>
            {task.taskLink.map((node, idx) => {
              return <div key={`node-${idx}`}>{node.name}</div>;
            })}
            <Button
              onClick={() => {
                toggle(task);
              }}
            >
              暂停/恢复
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default UploaderViewer;
