import Directory from './directory';
import Chunk from './chunk';
import SubTask, { ISubTaskProps } from './subTask';
import { prepareApi, finishApi } from '../api/file';
import { mockRequest } from './utils';
import { eventEmitter, EVENTS } from '../event';

export type FileStatus = 'init' | 'prepared' | 'sent' | 'uploaded' | 'error';

let fileId = 1;

export interface IFileUploadProps extends ISubTaskProps {
  file: File;
  type: string;
  parentDir: Directory | null;
}
export default class FileUpload extends SubTask {
  public fileId: string;
  public file: File;
  public type: string;
  public parentDir: Directory | null = null;
  public chunks: Chunk[] = [];

  // 后台返回的字段
  public uploadId: number = -1;
  public chunkSize: number = -1; // 分块大小
  public chunkNum: number = -1; // 分块数量

  public uploadedChunkIdx: number = -1; // 已上传的 chunk idx

  // todo: 状态机
  public fileStatus: FileStatus = 'init';

  public get totalSize(): number {
    return this.file.size;
  }

  public get uploadedSize(): number {
    if (this.uploadedChunkIdx === this.chunkNum - 1) {
      return this.file.size;
    }

    const uploadedChunkSize = (this.uploadedChunkIdx + 1) * this.chunkSize;

    const uploadingChunkSize = this.currentChunk ? this.currentChunk.uploadedSize : 0;
    console.log(
      'uploadedSize',
      uploadedChunkSize,
      uploadingChunkSize,
      uploadedChunkSize + uploadingChunkSize,
      this.file.size
    );
    return uploadedChunkSize + uploadingChunkSize;
  }

  constructor(props: IFileUploadProps) {
    super(props);
    this.fileId = `file-${fileId++}`;
    this.file = props.file;
    this.type = props.file.type;
    this.parentDir = props.parentDir;

    this.fileStatus = 'init';
  }

  public async upload() {
    console.log('file upload', this.name);

    if (this.fileStatus === 'init') {
      await this.prepare();
      return;
    }

    if (this.fileStatus === 'prepared') {
      await this.sendChunks();
      return;
    }

    if (this.fileStatus === 'sent') {
      await this.finish();
      return;
    }
  }

  private async prepare() {
    console.log('file prepare', this.name);

    try {
      const res = await prepareApi(this.name, this.totalSize, this.path);
      const { uploadId, chunkNum, chunkSize } = res.data;
      this.uploadId = uploadId;
      this.chunkNum = chunkNum;
      this.chunkSize = chunkSize;
      this.createChunk();
      this.fileStatus = 'prepared';
    } catch (e) {
      this.fileStatus = 'error';
      console.log('file prepare err', e);
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
    console.log('createChunk: ', this.chunks);
  }

  private get currentChunk(): Chunk | undefined {
    const { chunks, uploadedChunkIdx } = this;
    return chunks[uploadedChunkIdx + 1];
  }

  private async sendChunks() {
    console.log('file sendChunks', this.name);

    try {
      // 发送chunk
      const currentChunk = this.currentChunk;
      if (!currentChunk) {
        return;
      }

      await currentChunk.send();

      if (currentChunk.isFinish) {
        this.uploadedChunkIdx++;

        if (this.uploadedChunkIdx === this.chunks.length - 1) {
          this.fileStatus = 'sent';
        }
      }
    } catch (e) {
      console.log('file sendChunks err', e);
    }
  }

  // 上传完成之后，以一定频率循环调用此接口
  private async finish() {
    console.log('file finish', this.name);

    try {
      const res = await finishApi(this.uploadId);

      // 若后台处理完毕 data 为 true
      if (res.data) {
        this.fileStatus = 'uploaded';
        eventEmitter.emit(EVENTS.UPLOADED_FILE, res.data);
      } else {
        // 若未完成 则等待
        const TIMEOUT = 1000;
        await mockRequest(TIMEOUT);
      }
    } catch (e) {
      console.log('file finish err', e);
    }
  }

  public isError() {
    return this.fileStatus === 'error';
  }

  public isUploaded() {
    return this.fileStatus === 'uploaded';
  }

  public pause() {
    const currentChunk = this.currentChunk;
    if (!currentChunk) {
      return;
    }
    currentChunk.abort();
  }
}
