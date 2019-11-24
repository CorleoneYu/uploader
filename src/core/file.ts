import { Directory, Chunk, Task, mockRequest, } from "./index";

export type FileStatus = 'init' | 'prepared' | 'sent' | 'uploaded';

let fileId = 1;


export class FileUpload {
  public fileId: string;
  public file: File;
  public size: number;
  public type: string;
  public name: string;

  public parentDir: Directory | null = null;
  public task: Task;

  public chunks: Chunk[] = [];

  // todo: 状态机
  public fileStatus: FileStatus = 'init';

  constructor({
    file,
    parentDir,
    task,
  }: {
    file: File,
    parentDir: Directory | null;
    task: Task;
  }) {
    this.fileId = `file-${fileId++}`;
    const { size, type, name } = file;
    this.file = file;
    this.name = name;
    this.size = size;
    this.type = type;

    this.parentDir = parentDir;
    
    this.task = task;
    this.fileStatus = 'init';
  }

  async upload() {
    console.log('file upload', this.name);

    if (this.fileStatus === 'init') {
      await this.prepare();
    }
    
    if (this.fileStatus === 'prepared') {
      await this.sendChunks();
    }
    
    if (this.fileStatus === 'sent') {
      await this.finish();
    }

    return true;
  }

  async prepare() {
    console.log('file prepare', this.name);
    
    try {
      await mockRequest();
      // 根据数据设置chunk
      this.fileStatus = 'prepared';
    } catch (e) {
      console.log('file prepare err', e);
    }
  }

  async sendChunks() {
    console.log('file sendChunks', this.name);

    try {
      // 循环发送chunk
      await mockRequest();
      this.fileStatus = 'sent';
    } catch (e) {
      console.log('file sendChunks err', e);
    }
    
  }

  async finish() {
    console.log('file finish', this.name);

    try {
      await mockRequest();
      this.fileStatus = 'uploaded';
    } catch (e) {
      console.log('file finish err', e);
    }
  }

  // 可以跟 directory 提公共方法
  isTaskPaused() {
    return this.task.isPaused();
  }

  isUploaded() {
    return this.fileStatus === 'uploaded';
  }
}
