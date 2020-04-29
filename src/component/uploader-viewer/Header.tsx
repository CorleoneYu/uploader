import React, { useCallback } from 'react';
import { IUploader }  from './hooks/useUploader/useUploader';
import { CloseCircleOutlined } from '@ant-design/icons';
import { HeaderBox } from './style';

interface HeaderProps {
  handleClose: () => void;
  uploader: IUploader;
}

function Header(props: HeaderProps) {
  const { handleClose, uploader } = props;

  const renderStatus = useCallback(() => {
    switch (uploader.status) {
      case 'success':
        return '上传成功';
      case 'paused':
        return '全部暂停';
      case 'uploading':
        return '上传中';
    }
  }, [uploader]);

  return (
    <HeaderBox>
      <div className="status">{renderStatus()}</div>
      <div className="close-btn" onClick={handleClose}>
        <CloseCircleOutlined />
      </div>
    </HeaderBox>
  );
}

export default Header;
