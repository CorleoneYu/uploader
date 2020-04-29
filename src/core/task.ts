import SubTask from './subTask';
import { EVENTS, eventEmitter } from '../event';
export type TaskStatus = 'paused' | 'uploading' | 'success';

let taskId = 1;

export default class Task {
  public taskId: string;
  public root: SubTask | null = null;
  public path: string = '';
  public taskLink: SubTask[] = [];
  // todo 状态机 初始状态 paused
  // 在 task 层面才有 暂停、取消等状态
  public taskStatus: TaskStatus = 'paused';
  public currentIdx = 0;
  // 是否正在执行 upload 方法
  public _isLocked = false;

  public get name() {
    return this.root ? this.root.name : '';
  }

  public get size() {
    return this.root ? this.root.totalSize : 0;
  }

  public get uploadedSize() {
    return this.root ? this.root.uploadedSize : 0;
  }

  constructor(path: string) {
    this.taskId = `task-${taskId++}`;
    this.path = path;
  }

  pause() {
    console.log('task pause');
    this.taskStatus = 'paused';
  }

  /**
   * 使用递归调用自身
   * 需要在改动状态为 paused 后暂停递归调用
   * @param isStart 是否启动 upload
   */
  async upload(isStart: boolean = false) {
    if (isStart) {
      this.taskStatus = 'uploading';
    }

    // 当设置为暂停 退出递归调用
    if (this.taskStatus === 'paused') {
      return;
    }

    if (this._isLocked) {
      return;
    }
    this._isLocked = true;

    // 执行子任务
    // 从 task 层面看 子任务 taskItem 只有 upload、 isUploaded方法
    const taskItem = this.taskLink[this.currentIdx];
    await taskItem.upload();

    if (taskItem.isError()) {
      return;
    }

    if (taskItem.isUploaded()) {
      this.currentIdx++;

      // 判断是否已全部完成
      if (this.isFinish()) {
        this.taskStatus = 'success';
        eventEmitter.emit(EVENTS.UPDATE_TASK, this);
        return;
      }
    }

    this._isLocked = false;

    // 若未全部完成 则递归调用
    this.upload();
  }

  isFinish() {
    return this.currentIdx >= this.taskLink.length;
  }
}
