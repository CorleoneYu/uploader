import React, { useState, useCallback } from 'react';
import FolderTable from '../folder-table';
import useCurPath from '../../model/curPath';
import CreateFolderModal from '../create-folder';

/* antd */
import { Button } from 'antd';

import { HomeHeader } from './style';

const Home = () => {
  const curPathModel = useCurPath();
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <div>
      <HomeHeader>
        <h2>路径：{curPathModel.curPath}</h2>
        <div>
          <Button type="primary">上传</Button>
          <Button style={{ marginLeft: 10 }} onClick={showModal}>新建</Button>
        </div>
      </HomeHeader>
      <CreateFolderModal visible={modalVisible} hideModal={hideModal} />
      <FolderTable />
    </div>
  );
};

export default Home;
