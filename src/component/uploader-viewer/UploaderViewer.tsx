import React, { useCallback } from 'react';
import useInput from './hooks/useInput';
import useUploader from './hooks/useUploader';
import useVisible from './hooks/useVisible';
import Header from './Header';
import List from './List';
import Bar from './Bar';
import { cleanAllFile } from '../../api/file';
import { UploaderViewerBox } from './style';
/* antd */
import { Button } from 'antd';

function UploaderViewer() {
  const { visible, setVisible } = useVisible();
  const afterFileChange = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const { handleFileChange, state, uploader } = useUploader(afterFileChange);

  const { tasks } = state;
  const { inputBoxRef, handleClick } = useInput(handleFileChange);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return (
    <div>
      <div className="inputBox" ref={inputBoxRef}>
        <Button onClick={handleClick}>选择文件夹</Button>
        <Button onClick={cleanAllFile} type="danger" style={{ marginLeft: '20px' }}>
          清除脏数据
        </Button>
      </div>
      <UploaderViewerBox visible={visible}>
        <Header handleClose={handleClose} uploader={uploader} />
        <Bar uploader={uploader} />
        <List tasks={tasks} />
      </UploaderViewerBox>
    </div>
  );
}

export default UploaderViewer;
