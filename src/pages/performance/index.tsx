import { useRequest } from 'ahooks';
import S from './index.module.less';
import { getPerfOverview } from '@api/perf';
import Waterfall from './components/waterfall';
import Perf from './components/perf';
import { useState } from 'react';
import { Row, Col } from 'antd';
import DatePicker from '@components/date-picker';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const defaultDate: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs().subtract(30, 'd').startOf('d'), dayjs().endOf('d')];

export default function Performance() {
  const [date, setDate] = useState(defaultDate);

  const handleDateChange = (values: any) => {
    setDate(values);
  };

  const {
    data: overview,
    loading,
    refresh,
  } = useRequest(() => {
    let startAt;
    let endAt;
    if (Array.isArray(date)) {
      startAt = date[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = date[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }
    return getPerfOverview({ startAt, endAt });
  });

  return (
    <div className={S.container}>
      <Row justify="space-between" className={S.header}>
        <Col>
          <div className={S.title}>性能分析</div>
        </Col>
        <Col>
          <RangePicker value={date} onChange={handleDateChange} onOpenChange={(open) => !open && refresh()} />
        </Col>
      </Row>
      <Perf loading={loading} data={overview} />
      <Waterfall data={overview} />
    </div>
  );
}
