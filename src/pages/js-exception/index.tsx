import React, { useMemo, useState } from 'react';
import Trend from './components/trend';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import { ExceptionType, getJsStatistic, getTrend } from '@api/exception';
import S from './index.module.less';
import { Button, Card, Row, Spin, Tooltip } from 'antd';
import DatePicker from '@components/date-picker';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const defaultDateRange = [dayjs().subtract(7, 'd').startOf('d'), dayjs().endOf('d')] as [dayjs.Dayjs, dayjs.Dayjs];

function Panel(props: { label: string; value: string; help?: string }) {
  const { label, value, help } = props;
  return (
    <div className={S.panel}>
      <div className={S.label}>
        {label}
        {help && (
          <Tooltip title={help}>
            <QuestionCircleOutlined className={S.icon} />
          </Tooltip>
        )}
      </div>
      <div className={S.value}>{value}</div>
    </div>
  );
}

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

  const {
    data: statistic,
    loading: statisticLoading,
    refresh: statisticRefresh,
  } = useRequest(() => {
    return getJsStatistic({ startAt, endAt });
  });

  const handleDateChange = (e: any) => {
    setDateRange(e);
  };

  const { count = '-', userCount = '-', rate = '-', userRate = '-' } = statistic || {};

  const refresh = () => {
    trendRefresh();
    statisticRefresh();
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
      <Spin spinning={statisticLoading}>
        <div className={S['panel-container']}>
          <Panel label="错误数" value={count} help="发生错误总数" />
          <Panel label="影响用户数" value={userCount} help="发生错误中影响到的用户总数" />
          <Panel label="错误率" value={rate} help="发生错误的访问占比总访问量的比率" />
          <Panel label="影响用户率" value={userRate} help="错误影响用户数占比总用户数的比率" />
        </div>
      </Spin>

      <Trend data={trendData} loading={trendLoading} />
    </div>
  );
}
