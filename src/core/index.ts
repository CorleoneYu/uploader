import Uploader from './uploader';
import Task, { TaskStatus } from './task';
import FileUpload from './file';
import Directory from './directory';
import Chunk from './chunk';
import {
  getSingleUploader,
  createDirTask,
  createFileTree,
  createFileNode,
  mockRequest,
  createFileTask,
} from './utils';

export {
  Uploader,
  Task,
  FileUpload,
  Directory,
  Chunk,
  getSingleUploader,
  createDirTask,
  createFileTree,
  createFileNode,
  mockRequest,
  createFileTask,
};

export type TaskStatus = TaskStatus;