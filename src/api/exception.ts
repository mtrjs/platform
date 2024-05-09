import * as request from '@utils/request';

const apiPrefix = '';

export interface GetExceptionListParams extends Pager, DateFilter {
  name?: string;
  url?: string;
}

export interface IJsException {
  colno?: number;
  createdAt?: number;
  filename?: number;
  stacks?: string[];
  stack?: string;
  traceId?: string;
  count?: number;
  name?: string;
  message?: string;
  ua: string;
  osName?: string;
  osVersion?: string;
  browserName?: string;
  browserVersion?: string;
  id: string;
  totalCount?: number;
  userCount?: number;
}

export interface GetJsExceptionListParams extends Pager, DateFilter {
  message?: string;
}

export function getJsExceptionList(params: GetJsExceptionListParams) {
  return request.post<ResponseList<IJsException>>(`${apiPrefix}/exception/js/list`, params);
}

export interface IRequestException {
  createdAt: string;
  method: string;
  endTime: number;
  startTime: number;
  status: number;
  statusText: string;
  type: number;
  url: string;
  count?: number;
}

export interface GetRequestExceptionListParams extends Pager, DateFilter {
  message?: string;
  url?: string;
}

export function getRequestExceptionList(params: GetRequestExceptionListParams) {
  return request.post<ResponseList<IRequestException>>(`${apiPrefix}/exception/request/list`, params);
}

export interface IResourceException {
  src?: string;
  network_type?: string;
  totalCount?: number;
  userCount?: number;
  createdAt: string;
  _id: string;
}

export interface GetResourceExceptionListParams extends Pager, DateFilter {
  src?: string;
}

export function getResourceExceptionList(params: GetResourceExceptionListParams) {
  return request.post<ResponseList<IResourceException>>(`${apiPrefix}/exception/resource/list`, params);
}

export interface ITrend {
  date: string;
  value: number;
}

export enum ExceptionType {
  js = 'js',
  resource = 'resource',
  request = 'request',
}

interface TrendParams {
  startAt?: string;
  endAt?: string;
  type?: ExceptionType;
}

export function getTrend(params: TrendParams) {
  return request.post<ITrend[]>(`${apiPrefix}/exception/trend`, params);
}

export function getJsException(params: { id: string }) {
  return request.get<IJsException>(`${apiPrefix}/exception/js`, { params });
}

export interface StatisticParams {
  startAt?: string;
  endAt?: string;
}

export interface IJsStatistic {
  count: string;
  userCount: string;
  rate: string;
  userRate: string;
}

export function getJsStatistic(params: TrendParams) {
  return request.post<IJsStatistic>(`${apiPrefix}/exception/statistic/js`, params);
}
