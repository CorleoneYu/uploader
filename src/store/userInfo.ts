import { observable, action } from 'mobx';

type UserInfo = {
  username: string;
  account: string;
  usedCapacity: number;
  storageCapacity: number;
  token: string;
};

class UserInfoStore {
  @observable
  userInfo: UserInfo = {
    username: '',
    account: '',
    usedCapacity: 0,
    storageCapacity: 0,
    token: ''
  };

  @action
  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }
}

export default UserInfoStore;
