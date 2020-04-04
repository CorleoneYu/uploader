import React, { useState, useCallback } from 'react';
import FolderTable from '../folder-table';
import Preview from '../preview';
import useCurNodeKeyModel from '../../model/curNodeKey';
import CreateFolderModal from '../create-folder';
import useCurNodeModel from '../../model/curNode';

/* antd */
import { Button } from 'antd';

import { HomeHeader } from './style';

const Home = () => {
  const { curNodeKey } = useCurNodeKeyModel();
  const [modalVisible, setModalVisible] = useState(false);
  const { curNode } = useCurNodeModel();

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const renderMain = useCallback(() => {
    if (!curNode) {
      return;
    }

    if (curNode.get('isFile')) {
      return <Preview />;
    }

    return <FolderTable />;
  }, [curNode]);

  return (
    <div>
      <HomeHeader>
        <h2>路径：{curNodeKey ? curNodeKey : ''}</h2>
        <div>
          <Button type="primary">上传</Button>
          <Button style={{ marginLeft: 10 }} onClick={showModal}>
            新建
          </Button>
        </div>
      </HomeHeader>
      <CreateFolderModal visible={modalVisible} hideModal={hideModal} />
      {renderMain()}
    </div>
  );
};

export default Home;
