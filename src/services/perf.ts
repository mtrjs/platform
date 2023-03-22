import * as request from '@utils/request';
export interface PerfOverview {
  index: PerfOverviewIndex;
  waterfall: PerfOverviewWaterfall;
}

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
  FCP?: string;
  LCP?: string;
  TTFB?: string;
  TTI?: string;
}

export const getPerfOverview = () => {
  return request.get<PerfOverview>('/performance/overview');
};
