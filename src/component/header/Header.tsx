import React, { useCallback } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { HeaderBox, AvatarBox } from './style';
import useUserInfoModel from '../../model/userInfo';

import { layout } from '../../model/userInfo';

enum MENU_KEY {
  SETTING = 'setting',
  LAYOUT = 'layout',
}
const AvatarMenu = () => {
  const { userInfo } = useUserInfoModel();
  console.log('userInfo: ', userInfo);
  const handleClick = useCallback((e: any) => {
    const { key } = e;
    switch (key) {
      case MENU_KEY.SETTING:
        console.log('MENU_KEY.SETTING');
        return;
      case MENU_KEY.LAYOUT:
        layout();
        return;
    }
  }, []);

  return (
    <Menu onClick={handleClick}>
      {/* <Menu.Item disabled>{userInfo.userName}</Menu.Item> */}
      <Menu.Item key={MENU_KEY.SETTING}>设置</Menu.Item>
      <Menu.Item key={MENU_KEY.LAYOUT}>退出登录</Menu.Item>
    </Menu>
  );
};

export default function Header() {
  return (
    <HeaderBox>
      <h1 style={{ color: '#fff' }}>易动网盘</h1>
      <AvatarBox>
        <Dropdown overlay={AvatarMenu()} placement="bottomCenter">
          <Avatar>羽</Avatar>
        </Dropdown>
      </AvatarBox>
    </HeaderBox>
  );
}
