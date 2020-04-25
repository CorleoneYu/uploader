// import { mockRequest } from './utils';

// export async function main() {
//   console.log('main');

//   await finish();

//   await main();
// }

// let count = 5;
// async function finish() {
//   count--;
//   console.log('finish', count);
//   await mockRequest();

//   if (count > 0) {
//     await setTimeout(async () => {
//       await finish();
//     }, 100);
//   }

//   console.log('finish2');
// }
// main();