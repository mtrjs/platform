import * as request from '@utils/request';

export interface GetErrorListParams extends Pager {}

export interface IError {
  colno?: number;
  createdAt?: number;
  filename?: number;
  stack?: string;
  traceId?: string;
}

export function getErrorList(params: GetErrorListParams) {
  return request.get<ResponseList<IError>>('/error/list', {
    params,
  });
}
