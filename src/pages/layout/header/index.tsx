import { Cascader, Dropdown, Layout } from 'antd';
import { useMemo, useState } from 'react';
import CreateApp from '../create-app';
import S from './index.module.less';
import storage from '@utils/storage';
import { useSelector, useDispatch } from 'react-redux';
import application from '@slices/application';

const { Header } = Layout;

interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
}

export default function Component() {
  const [createAppVisible, setCreateAppVisible] = useState(false);
  const { list: applications, app_id, env } = useSelector<StoreState, ApplicationModel>((state) => state.application);

  const dispatch = useDispatch();

  const applicationsOptions = useMemo(() => {
    return applications.reduce<CascaderOption[]>((acc, cur) => {
      const { env, name, app_id } = cur;
      const envs: string[] = env.split(',');
      const node: CascaderOption = { label: name, value: app_id, children: [] };
      node.children = node.children?.concat(envs.map((env) => ({ label: env, value: env })));
      acc.push(node);
      return acc;
    }, []);
  }, [applications]);

  const logout = () => {
    storage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleApplicationChange = (value: any) => {
    const [app_id, env] = value;
    dispatch(application.actions.setApplication({ app_id, env }));
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
      {/* <div className={S.logo}>监控平台</div> */}
      <div className={S.setting}>
        <Cascader
          value={[app_id, env]}
          options={applicationsOptions}
          onChange={handleApplicationChange}
          className={S.app}
        />
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
