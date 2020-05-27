import React from 'react';
import { Avatar, Dropdown } from 'antd';
import { HeaderBox, AvatarBox } from './style';
import AvatarMenu from './AvatarMenu'


export default function Header() {
  return (
    <HeaderBox>
      <h1 style={{ color: '#fff' }}>易动网盘</h1>
      <AvatarBox>
        <Dropdown overlay={AvatarMenu()} placement="bottomCenter">
          <Avatar>盘</Avatar>
        </Dropdown>
      </AvatarBox>
    </HeaderBox>
  );
}
