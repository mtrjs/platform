import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip } from 'antd';
import { PerfOverviewIndex } from '@api/perf';
import S from './index.module.less';
import React from 'react';
import classNames from 'classnames';

interface Props {
  data?: PerfOverviewIndex;
  loading: boolean;
}

function PerformanceCard(props: {
  label: string;
  help?: string;
  value?: number;
  style?: React.CSSProperties;
  good: number;
  less: number;
}) {
  const { label, help, value, style, good, less } = props;

  const textColor = value
    ? value <= good
      ? 'rgb(40, 201, 137)'
      : value <= less
      ? 'rgb(255, 151, 36)'
      : 'rgb(255, 78, 92)'
    : '';

  const text = value ? `${value}${label !== 'CLS' ? 'ms' : ''}` : '-';

  return (
    <Card
      className={S['performance-card']}
      style={style}
      title={
        <div className={S.help}>
          <div className={S.label}>{label}</div>
          {help && (
            <Tooltip title={help}>
              <QuestionCircleOutlined size={30} className={S.icon} />
            </Tooltip>
          )}
        </div>
      }
    >
      <div className={S.value} style={{ color: textColor }}>
        {text}
      </div>
    </Card>
  );
}

export default function Perf(props: Props) {
  const { data, loading } = props;
  const { FCP, LCP, TTFB, TTI, FID, CLS } = data || {};

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
          <PerformanceCard label="FCP" help="首次内容绘制时间: 白屏时间" value={FCP} good={1800} less={3000} />
        </Col>
        <Col span={8}>
          <PerformanceCard
            label="LCP"
            help="最大内容绘制时间: Loading 页结束时间"
            style={{ marginLeft: 15 }}
            value={LCP}
            good={2500}
            less={4000}
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
      <Row style={{ marginTop: 15 }}>
        <Col span={8}>
          <PerformanceCard
            label="FID"
            help="首次交互时延: 用户第一次与页面交互（点击、轻触、按键等不连续操作）响应时间"
            value={FID}
            good={100}
            less={300}
          />
        </Col>
        <Col span={8}>
          <PerformanceCard
            label="TTI"
            help="可交互时间: 页面从开始加载到主要子资源完成渲染， 并能够快速、可靠响应用户输入需要的时间"
            value={TTI}
            style={{ marginLeft: 15 }}
            good={5000}
            less={5000}
          />
        </Col>

        <Col span={8}>
          <PerformanceCard
            label="CLS"
            help="累积布局偏移: 衡量布局稳定性的重要指标, 较低的CLS有助于确保一个页面是令人愉悦的"
            value={CLS}
            style={{ marginLeft: 15 }}
            good={0.1}
            less={0.25}
          />
        </Col>
      </Row>
    </Card>
  );
}
