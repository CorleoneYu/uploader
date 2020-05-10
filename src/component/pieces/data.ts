import { IPiece } from './config';


interface IData {
  polygon: string;
  bg: string;
  transition: string;
}

const drillData: IData = {
  polygon:
    'polygon(46.7% 81.357%, 30.3% 44.071%, 39.6% 36.643%);polygon(45.9% 77.214%, 39.6% 37.214%, 47.9% 46.071%);polygon(39.3% 36.929%, 54.2% 16.786%, 47.9% 46.214%);polygon(39.6% 41.071%, 47.1% 26.357%, 41.3% 45.929%);polygon(24.4% 26.357%, 35.7% 6.5%, 35.7% 17.5%);polygon(43.3% 34.5%, 47.3% 26.357%, 35.7% 17.5%);polygon(24.3% 26.357%, 35.7% 17.5%, 28.3% 34.214%);polygon(24.3% 26.357%, 31.9% 40.929%, 30.3% 45.214%);polygon(28.3% 34.071%, 35.7% 17.5%, 35.8% 48.929%);polygon(35.7% 17.5%, 43.3% 34.357%, 35.8% 48.643%);polygon(30.2% 45.357%, 35.7% 29.071%, 35.8% 48.786%);polygon(35.7% 29.071%, 41.4% 45.929%, 35.7% 48.786%);polygon(31.7% 40.786%, 39.4% 41.214%, 35.7% 44.071%);polygon(30.7% 40.929%, 35.8% 28.8%, 35.95% 42.929%);polygon(35.7% 29.071%, 40.8% 40.786%, 35.8% 42.929%);polygon(31.8% 25.786%, 35.7% 23.929%, 40% 25.786%);polygon(31.8% 25.786%, 39.9% 25.786%, 35.7% 29.071%);polygon(35.6% 17.357%, 35.7% 6.2%, 47.2% 26.357%);polygon(35.8% 6.5%, 54.7% 16.071%, 47.2% 26.357%);polygon(47.8% 46.2%, 54.23% 16.43%, 58.9% 38.929%);polygon(47.9% 45.7%, 52.5% 86.071%, 45% 86.071%);polygon(47.8% 46.071%, 58.7% 38.929%, 51.5% 78.5%);polygon(65% 14.214%, 74.1% 35.5%, 67.9% 41.5%);polygon(54.3% 16.786%, 67.4% 23.643%, 58.7% 39.071%);polygon(58.6% 38.786%, 67.4% 23.643%, 68% 41.643%);polygon(58.6% 38.7%, 68% 41.5%, 55.2% 57.643%);polygon(59.2% 54.786%, 62.4% 70.643%, 60.2% 84.071%);polygon(58.7% 53.071%, 67.97% 41.4%, 60.96% 69.3%);polygon(67.8% 41.5%, 74.1% 35.5%, 66.8% 62.214%);polygon(60.9% 69.1%, 67.9% 41.2%, 65.9% 84.357%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(38% 35%, 61% 35%, 70% 57%, 50% 72%, 30% 57%, 30% 57%, 30% 57%, 30% 57%);',
  bg:
    'rgb(44, 44, 38);rgb(19, 23, 13);rgb(58, 59, 46);rgb(212, 230, 213);rgb(135, 137, 109);rgb(183, 195, 173);rgb(170, 180, 161);rgb(160, 164, 153);rgb(22, 25, 25);rgb(40, 42, 39);rgb(180, 188, 161);rgb(193, 211, 187);rgb(126, 92, 104);rgb(80, 84, 83);rgb(64, 68, 69);rgb(68, 71, 61);rgb(0, 0, 0);rgb(110, 111, 81);rgb(94, 92, 64);rgb(91, 87, 58);rgb(59, 56, 37);rgb(80, 77, 49);rgb(146, 145, 125);rgb(84, 81, 53);rgb(71, 71, 53);rgb(56, 56, 40);rgb(19, 23, 13);rgb(37, 42, 30);rgb(91, 87, 58);rgb(46, 48, 24);rgb(26, 26, 29);rgb(26, 26, 29);rgb(26, 26, 29);rgba(0, 0, 0, 0);',
  transition:
    'all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.5s cubic-bezier(0.56, 0, 0.06, 0.99) 0s;',
};

export const drill = formatData(drillData);

const hirolaData: IData = {
  polygon:
    'polygon(20.35% 45.429%, 22.8% 35.571%, 28.95% 39.286%);polygon(20.35% 45.429%, 26.45% 41%, 23.65% 47.429%);polygon(22.8% 35.714%, 22.75% 27.857%, 30.05% 29%);polygon(25.4% 28.357%, 29.7% 28.929%, 22.8% 35.643%);polygon(22.8% 35.714%, 30% 28.857%, 27.95% 40.4%);polygon(22.85% 29.143%, 19.35% 24.857%, 22.65% 26.286%);polygon(22.75% 27.857%, 25.85% 25.571%, 30.05% 29.286%);polygon(29.85% 29%, 34.35% 26.286%, 32.75% 31.143%);polygon(23.45% 27.286%, 21.65% 16.143%, 24.95% 26.429%);polygon(26.05% 25.857%, 30.15% 19.714%, 28.05% 27.571%);polygon(21.75% 16%, 24.95% 4.429%, 22.25% 17.857%);polygon(30.05% 19.714%, 34.05% 15.571%, 28.85% 24.429%);polygon(33.15% 16.571%, 33.15% 4.429%, 33.95% 15.571%);polygon(29.95% 29.143%, 37.15% 42.571%, 27.85% 40%);polygon(27.75% 40%, 37.15% 42.429%, 33.8% 53.4%);polygon(33.45% 35.857%, 52.05% 38.2%, 37.05% 42.714%);polygon(37.2% 42.1%, 38.85% 58.714%, 33.75% 53.429%);polygon(37.05% 42.429%, 47.85% 60.714%, 38.75% 58.714%);polygon(37.05% 42.571%, 52.05% 38.143%, 47.85% 60.714%);polygon(38.85% 58.571%, 43.45% 59.571%, 36.65% 76.286%);polygon(38.55% 71.571%, 41.95% 85.429%, 36.65% 75.714%);polygon(43.85% 59.571%, 47.85% 60.571%, 46.35% 85.714%);polygon(47.75% 60.571%, 52% 38.143%, 61.95% 58.143%);polygon(51.85% 38.286%, 67.15% 35.714%, 73.65% 47.571%);polygon(52.05% 38.286%, 73.65% 47.429%, 61.85% 58.286%);polygon(65.85% 59.143%, 70.85% 52.286%, 73.65% 74.143%);polygon(61.85% 58.143%, 73.55% 47.429%, 68.35% 59.143%);polygon(61.85% 58%, 68.35% 59.143%, 68.35% 72.286%);polygon(71.45% 69.714%, 73.55% 73.857%, 71.35% 85.429%);polygon(66.45% 68.143%, 68.25% 72.143%, 62.05% 86.143%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(38% 35%, 61% 35%, 70% 57%, 50% 72%, 30% 57%, 30% 57%, 30% 57%, 30% 57%);',
  bg:
    'rgb(143, 107, 78);rgb(104, 75, 45);rgb(184, 144, 118);rgb(198, 161, 136);rgb(170, 130, 105);rgb(222, 201, 191);rgb(162, 114, 93);rgb(222, 201, 191);rgb(99, 76, 66);rgb(99, 76, 66);rgb(49, 43, 52);rgb(49, 43, 52);rgb(65, 52, 48);rgb(163, 120, 92);rgb(131, 93, 72);rgb(131, 93, 72);rgb(137, 100, 68);rgb(163, 120, 92);rgb(153, 110, 80);rgb(158, 118, 91);rgb(118, 86, 58);rgb(172, 128, 94);rgb(145, 105, 78);rgb(144, 103, 84);rgb(162, 120, 92);rgb(101, 78, 69);rgb(175, 137, 109);rgb(191, 156, 135);rgb(180, 132, 97);rgb(126, 92, 63);rgb(26, 26, 29);rgb(26, 26, 29);rgb(26, 26, 29);rgba(0, 0, 0, 0);',
  transition: 'all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.5s cubic-bezier(0.56, 0, 0.06, 0.99) 0s;',
};

export const hirola = formatData(hirolaData);

const okapiData: IData = {
  polygon:
    'polygon(26.8% 72.714%, 28.9% 37.714%, 33.5% 54.286%);polygon(26.8% 72.714%, 30.7% 61.571%, 27.8% 85%);polygon(28.9% 37.714%, 33.1% 29%, 30.5% 44.5%);polygon(30.4% 44.143%, 33.1% 28.857%, 43.3% 38%);polygon(30.4% 44%, 43.3% 37.714%, 33.3% 54.857%);polygon(33.2% 54.714%, 42.9% 37.857%, 38.1% 60.143%);polygon(33.2% 54.571%, 38.1% 59.857%, 33.4% 75.429%);polygon(33.4% 75.286%, 35.6% 68%, 37.2% 84.143%);polygon(33.1% 29%, 45.2% 27.714%, 43% 38%);polygon(45.2% 27.714%, 55.7% 46%, 38.6% 57.286%);polygon(45.1% 27.857%, 57.7% 24.429%, 55.5% 46%);polygon(38.6% 57.286%, 55.5% 45.857%, 56% 56%);polygon(55.4% 45.857%, 57.7% 24.429%, 63.4% 35%);polygon(55.4% 45.857%, 63.4% 34.857%, 59.3% 59.714%);polygon(55.4% 45.714%, 59.3% 59.571%, 55.9% 58%);polygon(51.6% 56.429%, 55.8% 56.143%, 53.2% 69.571%);polygon(52.3% 61.857%, 54.9% 81.714%, 51.4% 81.857%);polygon(55.9% 58%, 59.4% 59.286%, 58.7% 83.714%);polygon(57.6% 24.571%, 69.1% 18.143%, 68.8% 24.714%);polygon(57.6% 24.429%, 74.9% 24.714%, 63.4% 35.143%);polygon(63.3% 35%, 71.8% 27%, 61.8% 44.429%);polygon(68.8% 24.714%, 69.2% 18.143%, 74.1% 32%);polygon(69.1% 18%, 72.6% 14%, 74.1% 31.857%);polygon(73.4% 16.286%, 77.5% 11%, 76.6% 17.429%);polygon(71.4% 20%, 72.6% 14%, 76.7% 20%);polygon(71.5% 19.857%, 76.7% 20%, 77.1% 27.857%);polygon(71.45% 19.8%, 73.3% 22.4%, 71.6% 23%);polygon(73.3% 22.571%, 77.1% 28%, 74.1% 32.143%);polygon(74% 32%, 77.1% 27.857%, 77.3% 32%);polygon(69.1% 18.286%, 68.6% 10.429%, 71.9% 15%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(50% 50%, 50% 50%, 50% 50%);polygon(38% 35%, 61% 35%, 70% 57%, 50% 72%, 30% 57%, 30% 57%, 30% 57%, 30% 57%);',
  bg:
    'rgb(197, 194, 191);rgb(245, 247, 237);rgb(102, 36, 36);rgb(50, 29, 33);rgb(60, 40, 50);rgb(107, 66, 67);rgb(205, 202, 195);rgb(248, 248, 248);rgb(80, 39, 45);rgb(84, 53, 57);rgb(50, 29, 39);rgb(39, 30, 40);rgb(24, 15, 20);rgb(30, 30, 38);rgb(28, 22, 22);rgb(197, 194, 191);rgb(242, 242, 242);rgb(242, 242, 242);rgb(83, 52, 56);rgb(54, 33, 39);rgb(10, 12, 12);rgb(197, 194, 191);rgb(214, 210, 212);rgb(90, 63, 68);rgb(143, 72, 71);rgb(71, 41, 43);rgb(2, 6, 33);rgb(227, 227, 227);rgb(41, 46, 70);rgb(50, 29, 33);rgb(26, 26, 29);rgb(26, 26, 29);rgb(26, 26, 29);rgba(0, 0, 0, 0);',
  transition: 'all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.6s cubic-bezier(0.7, 0.3, 0, 1) 0s;all 0.5s cubic-bezier(0.56, 0, 0.06, 0.99) 0s;',
};

export const okapi = formatData(okapiData);

function format(str: string) {
  return str.split(';');
}

function formatData(data: IData): IPiece[] {
  const polygonAry = format(data.polygon);
  const bgAry = format(data.bg);
  const transitionAry = format(data.transition);

  return polygonAry.map((polygon: string, index: number) => {
    return {
      polygon,
      transition: transitionAry[index],
      fill: bgAry[index],
    };
  });
}

// let polygon = '';
// let bg = '';
// let transition = '';
// for (let i = 0; i < 34; i++) {
//   let item = window.getComputedStyle(document.getElementsByClassName('shard')[i]);
//   polygon += item.clipPath + ';';
//   bg += item.backgroundColor + ';';
//   transition += item.transition + ';';
// }
// console.log('polygon', polygon);
// console.log('bg', bg);
// console.log('transition: ', transition);