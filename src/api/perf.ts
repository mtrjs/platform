import * as request from '@utils/request';

export interface PerfOverviewWaterfall {
  unloadEventStart: number;
  unloadEventEnd: number;
  redirectStart: number;
  redirectEnd: number;
  domainLookupStart: number;
  domainLookupEnd: number;
  connectStart: number;
  secureConnectionStart: number;
  connectEnd: number;
  requestStart: number;
  responseStart: number;
  responseEnd: number;
  domInteractive: number;
  domContentLoadedEventStart: number;
  domContentLoadedEventEnd: number;
  domComplete: number;
  loadEventStart: number;
  loadEventEnd: number;
}

export interface PerfOverviewIndex {
  FCP?: number;
  LCP?: number;
  TTFB?: number;
  TTI?: number;
  FID?: number;
  CLS?: number;
}

interface GetPerfOverviewParams {
  startAt?: string;
  endAt?: string;
}

export const getPerfOverview = (params: GetPerfOverviewParams) => {
  return request
    .get<Response<PerfOverviewWaterfall & PerfOverviewIndex>>('/performance/overview', { params })
    .then((res) => res.data);
};
