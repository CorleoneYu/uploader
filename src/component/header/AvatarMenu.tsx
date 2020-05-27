import React, { useCallback } from 'react';
import { layout } from '../../model/userInfo';
import { Menu } from 'antd';
import showUserInfoModal from './UserInfoModal'
import useUpdatePwdModal from './useUpdatePwdModal'

enum MENU_KEY {
  INFO = 'info',
  LAYOUT = 'layout',
  UPDATE_PWD = 'updatePwd',
}

export default function AvatarMenu() {
  const { showUpdatePwdModal } = useUpdatePwdModal();
  const handleClick = useCallback((e: any) => {
    const { key } = e;
    switch (key) {
      case MENU_KEY.INFO:
          showUserInfoModal();
        return;
      case MENU_KEY.UPDATE_PWD:
          showUpdatePwdModal();
        return;
      case MENU_KEY.LAYOUT:
        layout();
        return;
      default:
        return;
    }
  }, [showUpdatePwdModal]);

  return (
    <Menu onClick={handleClick}>
      <Menu.Item key={MENU_KEY.INFO}>用户信息</Menu.Item>
      <Menu.Item key={MENU_KEY.UPDATE_PWD}>修改密码</Menu.Item>
      <Menu.Item key={MENU_KEY.LAYOUT}>退出登录</Menu.Item>
    </Menu>
  );
}
