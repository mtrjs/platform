import { Dropdown, Layout, Select } from 'antd';
import { useMemo, useState } from 'react';
import CreateApp from '../create-app';
import S from './index.module.less';
import storage from '@utils/storage';
import { useSelector, useDispatch } from 'react-redux';
import application from '@slices/application';

const { Header } = Layout;

export default function Component() {
  const [createAppVisible, setCreateAppVisible] = useState(false);
  const { list: applications, appId } = useSelector<StoreState, ApplicationModel>((state) => state.application);

  const dispatch = useDispatch();

  const applicationsOptions = useMemo(() => {
    return applications.map((o) => {
      const { name, appId } = o;
      return { label: name, value: appId };
    }, []);
  }, [applications]);

  const logout = () => {
    storage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleApplicationChange = (value: any) => {
    const [appId] = value;
    dispatch(application.actions.setApplication({ appId }));
  };

  const settingItems = useMemo(
    () => [
      {
        key: '1',
        label: <div onClick={() => setCreateAppVisible(true)}>创建应用</div>,
      },
      {
        key: '2',
        label: <div onClick={logout}>退出登录</div>,
      },
    ],
    []
  );

  return (
    <Header className={S.container} style={{ background: '#fff' }}>
      <img className={S.logo} />
      <div className={S.setting}>
        <Select value={appId} options={applicationsOptions} onChange={handleApplicationChange} className={S.app} />
        <Dropdown menu={{ items: settingItems }} placement="bottom">
          <img className={S.user} />
        </Dropdown>
      </div>
      <CreateApp
        open={createAppVisible}
        onClose={() => setCreateAppVisible(false)}
        onCancel={() => setCreateAppVisible(false)}
      />
    </Header>
  );
}
