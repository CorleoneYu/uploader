import { Directory, Chunk, Task } from "./index";

export class FileUpload {
  public file: File;
  public size: number;
  public type: string;
  public name: string;

  public parentDir: Directory | null = null;
  public task: Task;

  public chunks: Chunk[] = [];

  constructor({
    file,
    parentDir,
    task,
  }: {
    file: File,
    parentDir: Directory | null;
    task: Task;
  }) {
    const { size, type, name } = file;
    this.file = file;
    this.name = name;
    this.size = size;
    this.type = type;

    this.parentDir = parentDir;
    
    this.task = task;
  }
}
