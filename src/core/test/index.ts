import { createDir, createFile } from '../index';

export function mockTree() {
  const fileAry = createFile(5);

  const dirAry = createDir(3);

  dirAry[0].subDirs = [dirAry[1]];
  dirAry[0].subFiles = [fileAry[0], fileAry[1]];

  dirAry[1].subDirs = [dirAry[2]];
  dirAry[1].subFiles = [fileAry[2]];

  dirAry[2].subFiles = [fileAry[3], fileAry[4]];

  console.log(dirAry[0]);
  return dirAry[0];
}