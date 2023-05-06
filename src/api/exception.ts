import * as request from '@utils/request';

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
  os?: {
    name: string;
    version: string;
  };
  engine?: {
    name: string;
    version: string;
  };
  browser: {
    name: string;
    version: string;
    major: string;
  };
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  _id: string;
  totalCount?: number;
  userCount?: number;
}

export interface IConsole {
  traceId?: string;
  ua: string;
  createdAt?: number;
  _id: string;
}

export function getConsoleList(params: GetExceptionListParams) {
  return request
    .get<Response<ResponseList<IConsole>>>('/exception/console/list', {
      params,
    })
    .then((res) => res.data);
}

export function getJsExceptionList(params: GetExceptionListParams) {
  return request
    .get<Response<ResponseList<IJsException>>>('/exception/js/list', {
      params,
    })
    .then((res) => res.data);
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

export function getRequestExceptionList(params: GetExceptionListParams) {
  return request
    .get<Response<ResponseList<IRequestException>>>('/exception/request/list', {
      params,
    })
    .then((res) => res.data);
}

export interface IResourceException {
  src?: string;
  totalCount?: number;
  userCount?: number;
  createdAt: string;
  _id: string;
}

export function getResourceExceptionList(params: GetExceptionListParams) {
  return request
    .get<Response<ResponseList<IResourceException>>>('/exception/resource/list', {
      params,
    })
    .then((res) => res.data);
}

export interface ITrend {
  date: string;
  value: number;
}

interface TrendParams {
  startAt?: string;
  endAt?: string;
}

export function getJsTrend(params: TrendParams) {
  return request.get<Response<ITrend[]>>('/exception/js/trend', { params }).then((res) => res.data);
}

export function getResourceTrend(params: TrendParams) {
  return request.get<Response<ITrend[]>>('/exception/resource/trend', { params }).then((res) => res.data);
}

export function getRequestTrend(params: TrendParams) {
  return request.get<Response<ITrend[]>>('/exception/request/trend', { params }).then((res) => res.data);
}

export function getConsoleTrend(params: TrendParams) {
  return request.get<Response<ITrend[]>>('/exception/console/trend', { params }).then((res) => res.data);
}

export function getJsException(params: { id: string }) {
  return request.get<Response<IJsException>>('/exception/js', { params }).then((res) => res.data);
}

export function getConsoleException(params: { id: string }) {
  return request.get<Response<IJsException>>('/console/js', { params }).then((res) => res.data);
}
