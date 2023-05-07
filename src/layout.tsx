import React, { useEffect, useState } from 'react';
import { BankOutlined, ColumnHeightOutlined, BoxPlotOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { router } from './router';
import styles from './layout.module.less';
import { ROUTE_PATH } from '@constants/routes';
import { Outlet } from 'react-router-dom';
const { Header, Sider } = Layout;

const items: MenuProps['items'] = [
  { label: 'Dashboard', key: ROUTE_PATH.overview, icon: <BankOutlined /> },
  { label: '性能分析', key: ROUTE_PATH.performance, icon: <ColumnHeightOutlined /> },
  { label: '异常分析', key: ROUTE_PATH.exception, icon: <BoxPlotOutlined /> },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathname = router.state.location.pathname;

  const [selectKeys, setSelectKeys] = useState(pathname);

  useEffect(() => {
    setSelectKeys(pathname);
  }, [pathname]);

  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header">
        <div className={styles.logo}>监控平台</div>
      </Header>
      <Layout>
        <Sider width={240} style={{ background: colorBgContainer }}>
          <Menu
            className={styles.customMenu}
            mode="inline"
            defaultSelectedKeys={['/']}
            items={items}
            selectedKeys={[selectKeys]}
            onClick={(e) => {
              const { key } = e;
              router.navigate(key);
              setSelectKeys(key);
            }}
          />
        </Sider>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
