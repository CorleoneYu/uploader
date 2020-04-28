import React from 'react';
import { IUploader }  from './hooks/useUploader/useUploader';
import { CloseCircleOutlined } from '@ant-design/icons';
import { HeaderBox } from './style';

interface HeaderProps {
  handleClose: () => void;
  uploader: IUploader;
}

function Header(props: HeaderProps) {
  const { handleClose, uploader } = props;

  return (
    <HeaderBox>
      <div className="status">{uploader.status}</div>
      <div className="close-btn" onClick={handleClose}>
        <CloseCircleOutlined />
      </div>
    </HeaderBox>
  );
}

export default Header;
