import { Dayjs } from 'dayjs';

declare global {
  interface Pager {
    page: number;
    pageSize: number;
    total?: number;
  }

  interface ResponseList<T> {
    total: number;
    list: T[];
  }

  interface Response<T = any> {
    code: number;
    data: T;
    message: string;
  }

  interface DateFilter {
    startAt?: string;
    endAt?: string;
  }
}

declare module 'moment' {
  namespace moment {
    type Moment = Dayjs;
  }
  export = moment;
}
