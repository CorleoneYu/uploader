import FileUpload  from './file';
import SubTask, { ISubTaskProps } from './subTask';
import useFileMapModel from '../model/fileMap';

export type DirStatus = 'init' | 'uploaded' | 'error';

export interface IDirectoryProps extends ISubTaskProps {
  parentDir: Directory | null;
}
const createFolder = useFileMapModel.data!.createFolder;

let dirId = 1;
export default class Directory extends SubTask{
  public dirId: string;
  public parentDir: Directory | null = null;
  public subFiles: FileUpload[] = [];
  public subDirs: Directory[] = [];
  public dirStatus: DirStatus = 'init';

  constructor(props: IDirectoryProps) {
    super(props);
    this.dirId = `dir-${dirId++}`;
    this.parentDir = props.parentDir;
  }

  public async upload() {
    console.log('directory upload', this.name);

    try {
      await createFolder(this.name, this.path);
      this.dirStatus = 'uploaded';
    } catch (e) {
      console.log('dir upload err', e);
    }
  }

  public isError() {
    return this.dirStatus === 'error';
  }

  public isUploaded() {
    return this.dirStatus === 'uploaded';
  }


  private cachedSize: number = -1;
  public get totalSize(): number {
    if (this.cachedSize !== -1) {
      return this.cachedSize;
    }

    const filesSize = this.subFiles.reduce((acc, file) => {
      return acc + file.totalSize;
    }, 0);

    const dirsSize = this.subDirs.reduce((acc, dir) => {
      return acc + dir.totalSize;
    }, 0);

    return filesSize + dirsSize;
  }

  public get uploadedSize(): number {
    return this.subFiles.reduce((acc, file) => {
      return file.uploadedSize;
    }, 0)
  }
}
