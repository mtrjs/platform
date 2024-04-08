import React, { useMemo, useState } from 'react';
import Trend from './components/trend';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import { ExceptionType, getTrend } from '@api/exception';
import S from './index.module.less';
import { Button, Card, Row } from 'antd';
import DatePicker from '@components/date-picker';

const { RangePicker } = DatePicker;

const defaultDateRange = [dayjs().subtract(7, 'd').startOf('d'), dayjs().endOf('d')] as [dayjs.Dayjs, dayjs.Dayjs];

export default function Component() {
  const [dateRange, setDateRange] = useState(defaultDateRange);

  const [startAt, endAt] = useMemo(() => {
    let startAt;
    let endAt;
    if (Array.isArray(dateRange)) {
      startAt = dateRange[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = dateRange[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }
    return [startAt, endAt];
  }, [dateRange]);

  const {
    data: trendData,
    loading: trendLoading,
    refresh: trendRefresh,
  } = useRequest(() => {
    return getTrend({ startAt, endAt, type: ExceptionType.js }).then((o) =>
      o?.map((o) => ({ ...o, date: dayjs(o.date).format('MM-DD HH:mm') }))
    );
  });

  const handleDateChange = (e: any) => {
    setDateRange(e);
  };

  const refresh = () => {
    trendRefresh();
  };

  return (
    <div className={S.container}>
      <Card>
        <Row>
          <RangePicker value={dateRange} onChange={handleDateChange} />
          <Button style={{ marginLeft: 10 }} type="primary" onClick={refresh}>
            查询
          </Button>
        </Row>
      </Card>

      <Trend data={trendData} loading={trendLoading} />
    </div>
  );
}
