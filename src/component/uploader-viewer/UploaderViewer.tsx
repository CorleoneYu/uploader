import React, { Component } from "react";

import { createTask, getSingleUploader, Uploader, Task } from "../../core";

/* antd */
import { Button } from "antd";

interface IState {
  tasks: Task[];
}
export default class UploaderViewer extends Component<{}, IState> {
  inputBox: HTMLDivElement | null = null;
  inputDom: HTMLInputElement | null = null;
  uploader: Uploader = getSingleUploader();
  state = {
    tasks: []
  };

  onChangeFiles = (e: any) => {
    console.log("change files", e.target.value);
  };

  getInputBox = (element: HTMLDivElement) => {
    this.inputBox = element;
  };

  handleClick = () => {
    if (!this.inputBox) {
      return;
    }

    const inputDom = this.createInput();
    this.inputBox.appendChild(inputDom);
    inputDom.click();
  };

  createInput() {
    if (this.inputDom) {
      return this.inputDom;
    }

    const inputDom = document.createElement("input");
    inputDom.setAttribute("type", "file");
    inputDom.setAttribute("webkitdirectory", "webkitdirectory");
    inputDom.style.display = "none";
    inputDom.addEventListener("change", this.handleFileChange);

    this.inputDom = inputDom;
    return inputDom;
  }

  handleFileChange = (event: any) => {
    const task = createTask(event.target.files);
    this.uploader.addTask(task);
    this.uploader.upload(task.taskId);

    this.setState({
      tasks: [...this.state.tasks, task]
    });
  };

  togglePause(task: Task) {
    console.log('task togglePause', task);
    if (task.taskStatus === 'paused') {
      task.upload();
    } else if (task.taskStatus === 'uploading') {
      task.pause();
    }
  }

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <p>upload viewer</p>
        <div className="inputBox" ref={this.getInputBox}>
          <Button onClick={this.handleClick}>选择文件夹</Button>
        </div>
        {tasks.map((task: Task) => {
          return (
            <div key={`task-${task.taskId}`}>
              {task.taskLink.map((node, idx) => {
                return <div key={`node-${idx}`}>{node.name}</div>;
              })}
              <Button onClick={() => { this.togglePause(task) }}>暂停/恢复</Button>
            </div>
          );
        })}
      </div>
    );
  }
}
