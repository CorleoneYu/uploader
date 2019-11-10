import { Directory, Chunk, Task } from "./index";

let fileId = 1;
export class FileUpload {
  public fileId: string;
  public file: File;
  public size: number;
  public type: string;
  public name: string;

  public parentDir: Directory | null = null;
  public task: Task | null;

  public chunks: Chunk[] = [];

  constructor({
    file,
    parentDir,
    task,
  }: {
    file: File,
    parentDir: Directory | null;
    task: Task | null;
  }) {
    this.fileId = `file-${fileId++}`;
    const { size, type, name } = file;
    this.file = file;
    this.name = name;
    this.size = size;
    this.type = type;

    this.parentDir = parentDir;
    
    this.task = task;
  }
}
