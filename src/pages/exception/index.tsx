import { Col, Row } from 'antd';
import { useState } from 'react';
import JsException from './components/js-exception';
import ResourceException from './components/resource-exception';
import RequestException from './components/request-exception';
import ConsoleException from './components/console-exception';
import S from './index.module.less';
import DatePicker from '@components/date-picker';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import { getConsoleTrend, getJsTrend, getRequestTrend, getResourceTrend } from '@api/exception';

const { RangePicker } = DatePicker;

const defaultDate: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs().subtract(30, 'd').startOf('d'), dayjs().endOf('d')];

export default function Exception() {
  const [date, setDate] = useState(defaultDate);

  const {
    data = [],
    loading,
    refresh,
  } = useRequest(() => {
    let startAt;
    let endAt;
    if (Array.isArray(date)) {
      startAt = date[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = date[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }
    return Promise.all([
      getJsTrend({ startAt, endAt }).then((o) => o?.map((o) => ({ ...o, date: dayjs(o.date).format('MM-DD HH:mm') }))),
      getResourceTrend({ startAt, endAt }).then((o) =>
        o?.map((o) => ({ ...o, date: dayjs(o.date).format('MM-DD HH:mm') }))
      ),
      getRequestTrend({ startAt, endAt }).then((o) =>
        o?.map((o) => ({ ...o, date: dayjs(o.date).format('MM-DD HH:mm') }))
      ),
      getConsoleTrend({ startAt, endAt }).then((o) =>
        o?.map((o) => ({ ...o, date: dayjs(o.date).format('MM-DD HH:mm') }))
      ),
    ]);
  });

  const handleDateChange = (values: any) => {
    setDate(values);
  };

  return (
    <div className={S.container}>
      <Row justify="space-between" className={S.header}>
        <Col>
          <div className={S.title}>趋势数据</div>
        </Col>
        <Col>
          <RangePicker
            value={date}
            onChange={handleDateChange}
            onOpenChange={(open) => {
              !open && refresh();
            }}
          />
        </Col>
      </Row>
      <Row justify="space-between" gutter={[16, 24]}>
        <Col span={12}>
          <JsException data={data[0]} loading={loading} />
        </Col>
        <Col span={12}>
          <ResourceException data={data[1]} loading={loading} />
        </Col>
        <Col span={12}>
          <RequestException data={data[2]} loading={loading} />
        </Col>
        <Col span={12}>
          <ConsoleException data={data[3]} loading={loading} />
        </Col>
      </Row>
    </div>
  );
}
