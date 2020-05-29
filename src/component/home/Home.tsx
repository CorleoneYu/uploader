import React, { useCallback } from 'react';
import FolderTable from '../folder-table';
import Preview from '../preview';
import UploaderViewer from '../uploader-viewer';
import useCurNodeKeyModel from '../../model/curNodeKey';
import useCreateFolderModal from '../create-folder';
import useCurNodeModel from '../../model/curNode';

/* antd */
import { Button } from 'antd';

import { HomeHeader } from './style';

const Home = () => {
  const { curNodeKey } = useCurNodeKeyModel();
  const { curNode } = useCurNodeModel();
  const { showModal} = useCreateFolderModal();

  const renderMain = useCallback(() => {
    if (!curNode) {
      return;
    }

    if (curNode.get('isFile')) {
      return <Preview />;
    }

    return <FolderTable />;
  }, [curNode]);

  const renderBtn = useCallback(() => {
    if (curNode && !curNode.get('isFile')) {
      return (
        <div className="btn-group">
          <UploaderViewer />
          <Button style={{ marginLeft: 10 }} onClick={showModal}>
            新建
          </Button>
        </div>
      );
    }

    return;
  }, [curNode, showModal]);

  return (
    <div>
      <HomeHeader>
        <h2>路径：{curNodeKey ? curNodeKey : ''}</h2>
        {renderBtn()}
      </HomeHeader>
      {renderMain()}
    </div>
  );
};

export default Home;
