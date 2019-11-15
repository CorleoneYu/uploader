import React, { Component } from "react";

// import {}
/* antd */
import { Button } from 'antd';

export default class UploaderViewer extends Component {
  inputBox: HTMLDivElement | null = null;
  inputDom: HTMLInputElement | null = null;

  onChangeFiles = (e: any) => {
    console.log('change files', e.target.value);
  }

  getInputBox = (element: HTMLDivElement) => {
    this.inputBox = element;
  }

  handleClick = () => {
    if (!this.inputBox) {
      return;
    }

    const inputDom = this.createInput()
    this.inputBox.appendChild(inputDom);
    inputDom.click();
  }

  createInput() {
    if (this.inputDom) {
      return this.inputDom;
    }

    const inputDom = document.createElement('input');
    inputDom.setAttribute('type', 'file');
    inputDom.setAttribute('webkitdirectory', 'webkitdirectory');
    inputDom.style.display = 'none';
    inputDom.addEventListener('change', this.handleFileChange);

    this.inputDom = inputDom;
    return inputDom;
  }

  handleFileChange = (event: any) => {
    console.log('onChange', event.target.files);
  }

  render() {
    return (
      <div>
        <p>upload viewer</p>
        <div className="inputBox" ref={this.getInputBox}>
          <Button onClick={this.handleClick}>选择文件夹</Button>
        </div>
      </div>
    );
  }
}
