import { Layout } from 'antd';
import { useRequest } from 'ahooks';
import styles from './index.module.less';
import { getPerfOverview } from './service';
import Waterfall from './components/waterfall';
import Perf from './components/perf';

const { Content } = Layout;

function Component() {
  const { data: overview, loading, error } = useRequest(getPerfOverview);

  const { waterfall, index } = overview || {};
  return (
    <Content>
      <div className={styles.title}>性能指标</div>
      <Perf loading={loading} data={index} />
      <Waterfall data={waterfall} />
    </Content>
  );
}

export default Component;
