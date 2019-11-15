import { createFileNode } from './utils';

/**
 *  dir-1
 *    |
 *    |-------|------|
 *   dir2  file-1  file-2
 *    |
 *    |-------|
 *   dir3   file-3
 *    |
 *    |-------|
 *  file-4  file-5
 */
export function mockFileTree() {
  const fileAry = createFileNode(5, true);
  const dirAry = createFileNode(3, false);

  dirAry[0].children = [dirAry[1], fileAry[0], fileAry[1]];
  dirAry[1].children = [dirAry[2], fileAry[2]];
  dirAry[2].children = [fileAry[3], fileAry[4]];

  return dirAry[0];
}