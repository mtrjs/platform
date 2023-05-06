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

interface GetStatParams {
  startAt?: string;
  endAt?: string;
}

export const getStat = (params: GetStatParams) => {
  return request.get<Response<Stat>>('/overview/stat', { params }).then((res) => res.data);
};

export enum Dimension {
  os = 'os',
  browser = 'browser',
  engine = 'engine',
}

interface GetDeviceParams {
  startAt?: string;
  endAt?: string;
  type?: Dimension;
}

export interface DeviceStat {
  label: string;
  value: number;
}

export const getDevice = (params: GetDeviceParams) => {
  return request.get<Response<DeviceStat[]>>('/overview/device', { params }).then((res) => res.data);
};
