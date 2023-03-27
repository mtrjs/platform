import * as request from '@utils/request';

export interface Visit {
  uv: number;
  pv: number;
}

export interface ProvinceStat {
  name: string;
  value: number;
}

export interface Stat {
  province: ProvinceStat[];
  visit: Visit;
}

export const getStat = () => {
  return request.get<Stat>('/overview/stat');
};
