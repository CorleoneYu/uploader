import React from 'react';
import useInput from './hooks/useInput';
import useUploader from './hooks/useUploader';
import { cleanAllFile } from '../../api/file';
import { UploaderViewerBox } from './style';
/* antd */
import { Button } from 'antd';

function UploaderViewer() {
  const { handleFileChange } = useUploader();
  const { inputBoxRef, handleClick } = useInput(handleFileChange);
  return (
    <div>
      <div className="inputBox" ref={inputBoxRef}>
        <Button onClick={handleClick}>选择文件夹</Button>
        <Button onClick={cleanAllFile} type="danger" style={{ marginLeft: '20px' }}>
          清除脏数据
        </Button>
      </div>
      {/* <UploaderViewerBox>
        <div className="header"></div>
        <div className="body">
          <div className="bar"></div>
          <div className="task-list">
            {tasks.map((task: Task) => (
              <div className="task-item" key={task.taskId}>
                {task.root && task.root.name}
              </div>
            ))}
          </div>
        </div>
      </UploaderViewerBox> */}
    </div>
  );
}

export default UploaderViewer;
