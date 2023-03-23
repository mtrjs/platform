import * as request from '@utils/request';

export interface Visit {
  uv: number;
  pv: number;
}

export interface Stat {
  province: Record<string, any>[];
  visit: Visit;
}

export const getStat = () => {
  return request.get<Stat>('/overview/stat');
};
