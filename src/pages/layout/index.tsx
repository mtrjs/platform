import React, { useEffect, useState } from 'react';
import { BankOutlined, ColumnHeightOutlined, BoxPlotOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { router } from '../../router';
import S from './index.module.less';
import { ROUTE_PATH } from '@constants/routes';
import { Outlet } from 'react-router-dom';
import Header from './header';
const { Sider } = Layout;

const items: MenuProps['items'] = [
  { label: '访问分析', key: ROUTE_PATH.overview, icon: <BankOutlined /> },
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
      <Header />
      <Layout>
        <Sider width={240} style={{ background: colorBgContainer }} theme="light">
          <Menu
            className={S.customMenu}
            mode="inline"
            theme="light"
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
