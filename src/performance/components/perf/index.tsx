import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Spin, Tooltip } from 'antd';
import { PerfOverviewIndex } from '../../service';
import styles from './index.module.less';

interface Props {
  data?: PerfOverviewIndex;
  loading: boolean;
}

function Component(props: Props) {
  const { data, loading } = props;
  const {
    FCP = '',
    LCP = '',
    TTFB = '',
    TTI = '',
  } = data || {
    FCP: '-',
    LCP: '-',
    TTFB: '-',
    TTI: '-',
  };
  const PerformanceCard = (props: {
    label: string;
    help?: string;
    value: string;
    style?: React.CSSProperties;
  }) => {
    const { label, help, value, style } = props;
    return (
      <Card
        className={styles.performanceCard}
        style={style}
        title={
          <div className={styles.help}>
            <div className={styles.label}>{label}</div>
            {help && (
              <Tooltip title={help}>
                <QuestionCircleOutlined size={30} className={styles.icon} />
              </Tooltip>
            )}
          </div>
        }
      >
        <div className={styles.value}>{value}ms</div>
      </Card>
    );
  };
  return (
    <Spin spinning={loading}>
      <Row style={{ marginTop: 15 }}>
        <Col span={8}>
          <PerformanceCard
            label="FCP"
            help="首次内容绘制时间: 白屏时间"
            value={FCP}
          ></PerformanceCard>
        </Col>
        <Col span={8}>
          <PerformanceCard
            label="LCP"
            help="最大内容绘制时间: Loading 页结束时间"
            style={{ marginLeft: 15 }}
            value={LCP}
          ></PerformanceCard>
        </Col>
        <Col span={8}>
          <PerformanceCard
            label="TTFB"
            help="首字节时间: 页面返回第一个字节的时间, 代表网络的整体耗时"
            style={{ marginLeft: 15 }}
            value={TTFB}
          ></PerformanceCard>
        </Col>
      </Row>
      <Row style={{ marginTop: 15 }}>
        <Col span={8}>
          <PerformanceCard
            label="TTI"
            help="首次可交互时间"
            value={TTI}
          ></PerformanceCard>
        </Col>
      </Row>
    </Spin>
  );
}

export default Component;
