import { Directory, Chunk, Task, mockRequest } from './index';
import { prepareApi, finishApi } from '../api/file';
export type FileStatus = 'init' | 'prepared' | 'sent' | 'uploaded';

let fileId = 1;

export default class FileUpload {
  public fileId: string;
  public file: File;
  public size: number;
  public type: string;
  public name: string;
  public path: string;

  public parentDir: Directory | null = null;
  public task: Task;

  public chunks: Chunk[] = [];

  // 后台返回的字段
  public uploadId: number = -1;
  public chunkSize: number = -1; // 分块大小
  public chunkNum: number = -1; // 分块数量

  // todo: 状态机
  public fileStatus: FileStatus = 'init';

  constructor({
    file,
    parentDir,
    task,
    path,
  }: {
    file: File;
    parentDir: Directory | null;
    task: Task;
    path: string;
  }) {
    this.fileId = `file-${fileId++}`;
    const { size, type, name } = file;
    this.file = file;
    this.name = name;
    this.size = size;
    this.type = type;
    this.path = path;

    this.parentDir = parentDir;

    this.task = task;
    this.fileStatus = 'init';
  }

  async upload() {
    console.log('file upload', this.name);

    if (this.fileStatus === 'init') {
      const res = await this.prepare();
      if (!res) {
        return false;
      }
    }

    if (this.fileStatus === 'prepared') {
      const res = await this.sendChunks();
      if (!res) {
        return false;
      }
    }

    if (this.fileStatus === 'sent') {
      const res = await this.finish();
      if (!res) {
        return false;
      }
    }

    return true;
  }

  async prepare(): Promise<boolean> {
    console.log('file prepare', this.name);

    try {
      const res = await prepareApi(this.name, this.size, this.path);
      const { uploadId, chunkNum, chunkSize } = res.data;
      this.uploadId = uploadId;
      this.chunkNum = chunkNum;
      this.chunkSize = chunkSize;
      this.createChunk();
      this.fileStatus = 'prepared';
      return true;
    } catch (e) {
      console.log('file prepare err', e);
      return false;
    }
  }

  /**
   * 根据后台字段进行分片
   */
  private createChunk() {
    const chunks: Chunk[] = [];
    const { file, chunkSize, uploadId } = this;
    let idx = 0;
    while (idx * chunkSize < file.size) {
      const cur = idx * chunkSize;
      const chunk = new Chunk(
        this,
        uploadId,
        file.slice(cur, Math.min(cur + chunkSize, file.size)),
        idx
      );
      idx++;
      chunks.push(chunk);
    }
    this.chunks = chunks;
  }

  async sendChunks(): Promise<boolean> {
    console.log('file sendChunks', this.name);

    try {
      // 循环发送chunk
      const { chunks } = this;
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        await chunk.send();
      }

      this.fileStatus = 'sent';
      return true;
    } catch (e) {
      console.log('file sendChunks err', e);
      return false;
    }
  }

  // 上传完成之后，以一定频率循环调用此接口
  // 直到返回true，表示上传成功结束。
  async finish(): Promise<boolean> {
    console.log('file finish', this.name);

    try {
      const res = await finishApi(this.uploadId);

      // 若后台处理完毕 data 为 true
      if (res.data) {
        this.fileStatus = 'uploaded';
      }

      return true;
    } catch (e) {
      console.log('file finish err', e);
      return false;
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
