import Task from './task';

let subTaskId = 1;

export interface ISubTaskProps {
  name: string;
  path: string;
  task: Task;
}

export default abstract class SubTask {
  public subTaskId: string;
  public name: string;
  public path: string;
  public task: Task;

  constructor(props: ISubTaskProps) {
    this.subTaskId = `subTask-${subTaskId++}`;
    this.name = props.name;
    this.path = props.path;
    this.task = props.task;
  }

  /**
   * 总大小
   */
  public abstract get totalSize(): number;

  /**
   * 已上传的 size
   */
  public abstract get uploadedSize(): number;

  /**
   * 计算进度
   */
  public get progress(): number {
    // 保留两位小数
    return Math.round((this.uploadedSize / this.totalSize) * 10000) / 100;
  }

  public abstract isError(): boolean;

  public abstract isUploaded(): boolean;

  public abstract upload(): void;
}