enum EVENTS {
  // data 更新 ui
  UPDATE_TASK = 'UPDATE_TASK',
  UPLOADED_FILE = 'UPLOADED_FILE', // 文件上传完成

  // ui 更新 data
  UI_PAUSE_TASK = 'UI_PAUSE_TASK', // 用户暂停任务
  UI_START_TASK = 'UI_START_TASK', // 用户开启任务

};

export default EVENTS;