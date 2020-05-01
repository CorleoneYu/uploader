import React, { useEffect, useCallback } from 'react';
import { Button, message } from 'antd';
import usePreviewFileModel, { FILE_TYPE } from '../../model/preview';
import { PreviewBox } from './style';

export default function Preview() {
  const { previewFile, fetchPreviewFile } = usePreviewFileModel();

  useEffect(() => {
    fetchPreviewFile();
  }, [fetchPreviewFile]);

  // 点击复制链接
  const handleCopy = useCallback(() => {
    if (!previewFile) {
      return;
    }

    const copyInput = document.createElement('input');
    copyInput.setAttribute('readonly', 'readonly');
    copyInput.setAttribute('value', previewFile.previewUrl);

    document.body.appendChild(copyInput);
    copyInput.select();
    copyInput.setSelectionRange(0, previewFile.previewUrl.length);

    if (document.execCommand('copy')) {
        document.execCommand('copy');
        message.success({
          content: '链接已复制'
        });
    } else {
        console.log('复制失败');
    }
    document.body.removeChild(copyInput);
  }, [previewFile]);

  const preview = useCallback(() => {
    if (!previewFile) {
      return;
    }

    switch (previewFile.fileType) {
      case FILE_TYPE.IMG:
        return <img className="preview-img" src={previewFile.previewUrl} alt="preview-img" />;
      default:
        return;
    }
  }, [previewFile]);

  const handleDownload = useCallback(() => {
    if (!previewFile) {
      return;
    }

    const aLink = document.createElement('a');
    aLink.setAttribute('href', previewFile.previewUrl);
    aLink.setAttribute('download', previewFile.name);
    aLink.addEventListener('click', () => {
      console.log('download');
    });
    aLink.click();
  }, [previewFile]);

  if (!previewFile) {
    return null;
  }

  return (
    <PreviewBox>
      <div className="btn-group">
        <Button onClick={handleCopy}>复制链接</Button>
        <Button type="primary" onClick={handleDownload}>下载</Button>
        {preview()}
      </div>
    </PreviewBox>
  );
}
