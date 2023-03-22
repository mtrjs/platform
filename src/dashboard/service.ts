import * as request from '@utils/request';

interface PerfOverview {
  FCP?: string;
  LCP?: string;
  TTFB?: string;
  TTI?: string;
}

export const getPerfOverview = () => {
  return request.get<PerfOverview>('/performance/overview');
};
