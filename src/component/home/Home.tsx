import React from 'react';
import FolderTable from '../folder-table';
import useCurPath from '../../model/curPath';

/* antd */
import { Button } from 'antd';

import { HomeHeader } from './style';

const Home = () => {
  const curPathModel = useCurPath();

  return (
    <div>
      <HomeHeader>
        <h2>路径：{curPathModel.curPath}</h2>
        <div>
          <Button type="primary">上传</Button>
          <Button style={{ marginLeft: 10 }}>新建</Button>
        </div>
        
      </HomeHeader>

      <FolderTable />
    </div>
  );
};

export default Home;
