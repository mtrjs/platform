import { Card, Col, Row } from 'antd';
import S from './index.module.less';
import classNames from 'classnames';
import PerformanceCard from '../perf-card';
import { PerfOverviewIndex } from '@api/perf';

interface Props {
  data?: PerfOverviewIndex;
  loading: boolean;
}

export default function Perf(props: Props) {
  const { data, loading } = props;
  const { FCP, LCP, TTFB } = data || {};

  return (
    <Card
      className={S.container}
      loading={loading}
      title="加载性能"
      extra={
        <Row className={S['status-help']}>
          <Row align="middle">
            <div className={classNames(S.card, S['card-perfect'])} />
            <div className={S.text}>优秀</div>
          </Row>
          <Row align="middle">
            <div className={classNames(S.card, S['card-mid'])} />
            <div className={S.text}>良好</div>
          </Row>
          <Row align="middle">
            <div className={classNames(S.card, S['card-poor'])} />
            <div className={S.text}>待提升</div>
          </Row>
        </Row>
      }
    >
      <Row>
        <Col span={8}>
          <PerformanceCard label="FCP" help="首次内容绘制时间: 白屏时间" value={FCP} good={2300} less={3500} />
        </Col>
        <Col span={8}>
          <PerformanceCard
            label="LCP"
            help="最大内容绘制时间: Loading 页结束时间"
            style={{ marginLeft: 15 }}
            value={LCP}
            good={3000}
            less={4500}
          />
        </Col>
        <Col span={8}>
          <PerformanceCard
            label="TTFB"
            help="首字节时间: 页面返回第一个字节的时间, 代表网络的整体耗时"
            style={{ marginLeft: 15 }}
            value={TTFB}
            good={800}
            less={1800}
          />
        </Col>
      </Row>
    </Card>
  );
}
