export function formatSize(bytes: number) {
  // fix: 1024 返回空的 bug
  var symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var exp = Math.floor(Math.log(bytes) / Math.log(2));
  if (exp < 1) {
    exp = 0;
  }
  var i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);

  let str = '';
  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    str = bytes.toFixed(2);
  }

  if (!str) {
    return '空';
  }

  return str + ' ' + symbols[i];
}

export function formatTime(time: number): string {
  const date = new Date(time);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() + ' ';
  const h = date.getHours() + ':';
  const m = date.getMinutes() + ':';
  const s = date.getSeconds();

  return Y + M + D + h + m + s;
}