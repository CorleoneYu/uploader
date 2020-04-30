import { FileUpload } from './index';
import { uploadApi } from '../api/file';
import { cancelToken } from '../api';
import { CancelTokenSource } from 'axios';
import { EVENTS, eventEmitter } from '../event';

export default class Chunk {
  public fileUpload: FileUpload;
  public uploadId: number;
  public fileData: Blob;
  public chunkIndex: number;
  public uploadedSize: number = 0;
  public isFinish: boolean = false;
  public source: CancelTokenSource | null = null;

  constructor(fileUpload: FileUpload, uploadId: number, fileData: Blob, chunkIndex: number) {
    this.fileUpload = fileUpload;
    this.uploadId = uploadId;
    this.fileData = fileData;
    this.chunkIndex = chunkIndex;
  }

  public send = async () => {
    const { uploadId, fileData, chunkIndex } = this;
    eventEmitter.emit(EVENTS.UPDATE_TASK, this.fileUpload.task);

    try {
      console.log('chunk send', this);
      this.source = cancelToken.source();
      await uploadApi(uploadId, chunkIndex, fileData, this.onProgress, this.source);
      this.isFinish = true;
    } catch (err) {
      console.log('Chunk -> send -> err', err);
    }
  }

  onProgress = (event: ProgressEvent): void => {
    this.uploadedSize = event.loaded;
    eventEmitter.emit(EVENTS.UPDATE_TASK, this.fileUpload.task);
  }

  abort = () => {
    console.log('abort', this.source);
    this.source && this.source.cancel('abort');
  }
}
