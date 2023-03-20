import React from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  BankOutlined,
  ColumnHeightOutlined,
  BarChartOutlined,
  BoxPlotOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import styles from './layout.module.less';

const { Header, Content, Sider } = Layout;

const items: MenuProps['items'] = [
  { label: 'Dashboard', key: '1', icon: <BankOutlined /> },
  { label: '性能分析', key: '4', icon: <ColumnHeightOutlined /> },
  { label: '资源分析', key: '2', icon: <BarChartOutlined /> },
  { label: '异常分析', key: '3', icon: <BoxPlotOutlined /> },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header">
        <div className={styles.logo}>监控平台</div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
