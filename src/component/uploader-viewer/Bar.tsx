import React from 'react';
import { IUploader } from './hooks/useUploader/useUploader';
import { BarBox } from './style';

interface HeaderProps {
  uploader: IUploader;
}

function Bar(props: HeaderProps) {
  const { uploader } = props;

  return (
    <BarBox>
      <div className="info">
        已上传 {uploader.done} / {uploader.total} 个任务
      </div>
      {/* <div className="operate-btn">全部取消</div> */}
    </BarBox>
  );
}

export default Bar;
