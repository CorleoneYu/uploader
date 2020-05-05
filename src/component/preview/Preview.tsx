import React, { useEffect, useCallback } from 'react';
import { Button, message } from 'antd';
import usePreviewFileModel, { FILE_TYPE } from '../../model/preview';
import useCurNodeModel from '../../model/curNode';
import { PreviewBox } from './style';
import { downloadFileApi } from '../../api/file';

export default function Preview() {
  const { previewFile, fetchPreviewFile } = usePreviewFileModel();
  const { curNode } = useCurNodeModel();

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
        content: '链接已复制',
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

  // 下载文件
  const handleDownload = useCallback(() => {
    if (!curNode) {
      return;
    }

    // try {
    //   const res = await downloadFileApi(curNode.get('fileId'));
    //   const blob = new Blob([res.data], {
    //     // 下载的文件类型格式（二进制流，不知道下载文件类型可以设置为这个
    //     // 具体请查看HTTP Content-type 对照表
    //     type: 'application/octet-stream',
    //   });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.setAttribute('download', curNode.get('fileName')); // 设置下载的文件名
    //   document.body.appendChild(a);

    //   a.click();
    //   document.body.removeChild(a); //下载完成移除dom元素
    //   URL.revokeObjectURL(url); //释放掉blob对象
    // } catch (err) {
    //   console.log('err', err);
    // }
    downloadFileApi(curNode.get('fileId'));
  }, [curNode]);

  if (!previewFile) {
    return null;
  }

  return (
    <PreviewBox>
      <div className="btn-group">
        <Button onClick={handleCopy}>复制链接</Button>
        <Button type="primary" onClick={handleDownload}>
          下载
        </Button>
        {preview()}
      </div>
    </PreviewBox>
  );
}
