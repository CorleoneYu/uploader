import { drill, hirola, okapi } from './data';

export interface IPiece {
  polygon: string;
  fill: string;
  transition: string;
}

export interface IConfig {
  name: string;
  pieces: IPiece[];
}

const hirolaConfig = {
  name: 'Hirola',
  pieces: hirola,
};

const drillConfig = {
  name: 'Drill',
  pieces: drill,
};

const okapiConfig = {
  name: 'Okapi',
  pieces: okapi,
};
const config = [drillConfig, hirolaConfig, okapiConfig];
export default config;
