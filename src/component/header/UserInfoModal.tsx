import React, { useEffect } from 'react'
import useUserInfoModel from '../../model/userInfo';
import { formatSize } from '../../utils'
import { Modal } from 'antd'

const UserInfo = () => {
  const { updateUserInfo, userInfo } = useUserInfoModel();

  useEffect(() => {
    updateUserInfo()
  }, [updateUserInfo])

  return <div>
    <p>用户名：{userInfo.userName}</p>
    <p>容量: {formatSize(userInfo.usedCapacity)} / {formatSize(userInfo.storageCapacity)}</p>
  </div>
}

export default function showUserInfoModal() {
  Modal.confirm({
    title: '用户信息',
    content: <UserInfo />,
  })
}
