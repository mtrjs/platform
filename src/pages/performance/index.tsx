import { useRequest } from 'ahooks';
import { getPerfOverview } from '@api/perf';
import Waterfall from './components/waterfall';
import Perf from './components/perf';
import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import DatePicker from '@components/date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import settingSlice from '@slices/setting';
import dayjs from 'dayjs';
import S from './index.module.less';

const { RangePicker } = DatePicker;

export default function Performance() {
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const { dateRange = [] } = rootState.setting || {};
  const dateRangeState = useMemo(
    () =>
      dateRange.map((v: string | number | dayjs.Dayjs | Date | null | undefined) => dayjs(v)) as [
        dayjs.Dayjs,
        dayjs.Dayjs
      ],
    [dateRange]
  );

  const handleDateChange = (values: any) => {
    dispatch(settingSlice.actions.setDateRange(values));
  };

  const {
    data: overview,
    loading,
    refresh,
  } = useRequest(() => {
    let startAt;
    let endAt;
    if (Array.isArray(dateRangeState)) {
      startAt = dateRangeState[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = dateRangeState[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }
    return getPerfOverview({ startAt, endAt });
  });
  console.log(overview);

  return (
    <div className={S.container}>
      <Row justify="space-between" className={S.header}>
        <Col>
          <div className={S.title}>性能分析</div>
        </Col>
        <Col>
          <RangePicker value={dateRangeState} onChange={handleDateChange} onOpenChange={(open) => !open && refresh()} />
        </Col>
      </Row>
      <Perf loading={loading} data={overview} />
      <Waterfall data={overview} />
    </div>
  );
}
