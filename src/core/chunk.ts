import { FileUpload } from './index';
import { uploadApi } from '../api/file';
import { EVENTS, eventEmitter } from '../event';

export default class Chunk {
  public fileUpload: FileUpload;
  public uploadId: number;
  public fileData: Blob;
  public chunkIndex: number;
  public uploadedSize: number = 0;

  constructor(fileUpload: FileUpload, uploadId: number, fileData: Blob, chunkIndex: number) {
    this.fileUpload = fileUpload;
    this.uploadId = uploadId;
    this.fileData = fileData;
    this.chunkIndex = chunkIndex;
  }

  public async send(): Promise<boolean> {
    const { uploadId, fileData, chunkIndex } = this;

    try {
      const res = await uploadApi(uploadId, chunkIndex, fileData, this.onProgress);
      console.log('Chunk -> send -> res', res);
      return true;
    } catch (err) {
      console.log('Chunk -> send -> err', err);
      return false;
    }
  }

  onProgress = (event: ProgressEvent): void => {
    this.uploadedSize = event.loaded;
    eventEmitter.emit(EVENTS.UPDATE_TASK, this.fileUpload.task);
  }
}
