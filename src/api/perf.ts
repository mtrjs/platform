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
}

interface GetPerfOverviewParams {
  startAt?: string;
  endAt?: string;
}

export const getPerfOverview = (params: GetPerfOverviewParams) => {
  return request
    .get<Response<PerfOverviewWaterfall & PerfOverviewIndex>>(`/performance/overview`, { params })
    .then((res) => res.data);
};

export interface GetPerfListParams extends Pager {
  contentName?: string;
  orderByColumn?: string;
  orderBy?: string;
  fcp?: number;
  fcpType?: number;
  lcp?: number;
  lcpType?: number;
  ttfb?: number;
  ttfbType?: number;
}

export interface PerformanceResource {
  name: string;
  duration: number;
  initiatorType: string;
  startTime: number;
  fetchStart: number;
  nextHopProtocol: string;
  encodedBodySize: number;
  decodedBodySize: number;
  _id: string;
}

export type PerfDetail = PerfOverviewWaterfall & {
  fcp: number;
  lcp: number;
  createdAt: string;
  name?: string;
  contentName?: string;
  contentId?: string;
  osName?: string;
  osVersion?: string;
  browserName: string;
  browserVersion: string;
  resource: PerformanceResource[];
  traceId: string;
};

export const getPerfList = (params: GetPerfListParams) => {
  return request.post<ResponseList<PerfDetail>>(`/performance/list`, params);
};

export const getPerfDetail = (params: { id: string }) => {
  return request.get<PerfDetail>(`/performance`, { params });
};

export interface GetPerfResourceListParams extends Pager {
  name?: string;
  startAt?: string;
  endAt?: string;
  orderByColumn?: string;
  orderBy?: string;
  initiatorType?: InitiatorType;
  durationType?: number;
  durationValue?: number;
  decodedBodySizeType?: number;
  decodedBodySizeValue?: number;
  encodedBodySizeType?: number;
  encodedBodySizeValue?: number;
}

export interface IPerfResource {
  name?: string;
  initiatorType?: InitiatorType;
}

export type InitiatorType = 'script' | 'link' | 'img';

export const getPerfResourceList = (params: GetPerfListParams) => {
  return request.post<ResponseList<IPerfResource>>(`/performance/resource/list`, params);
};
