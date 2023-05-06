import { useRequest } from 'ahooks';
import { Drawer, Skeleton } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { getJsException } from '@api/exception';
import { useEffect } from 'react';
import S from './index.module.less';
import Icon from '@components/Iconfont';

interface Props extends DrawerProps {
  open: boolean;
  id?: string;
}

export default function Detail(props: Props) {
  const { open, onClose, id } = props;

  const { data, refresh, loading } = useRequest(
    () => {
      if (!id) {
        return Promise.reject();
      }
      return getJsException({ id });
    },
    { manual: true }
  );

  useEffect(() => {
    if (open) {
      refresh();
    }
  }, [id, open, refresh]);

  const renderContent = () => {
    const { name, message, totalCount, createdAt, userCount, ua, browser, stacks = [], os } = data || {};
    return (
      <div>
        <Skeleton loading={loading} active={true}>
          <div className={S.header}>
            <div className={S.info}>
              <div className={S.title}>{name || message}</div>
              <div className={S.message}>{message}</div>
            </div>
            <div className={S.date}>
              <Icon name="time" size={14} />
              <div className={S.label}>{createdAt}</div>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={loading} active={true}>
          <div className={S.subtitle}>数据概况</div>
          <div className={S.stat}>
            <div className={S.card}>
              <div className={S.value}>{totalCount}</div>
              <div className={S.label}>发生总次数</div>
            </div>

            <div className={S.card}>
              <div className={S.value}>{userCount}</div>
              <div className={S.label}>影响用户数</div>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={loading} active={true}>
          <div className={S.subtitle}>设备信息</div>
          <div className={S.device}>
            <div className={S.card}>
              <Icon name="shebeileixing" size={30} />
              <div className={S.name}>{browser?.name}</div>
              <div className={S.version}>{browser?.version}</div>
            </div>
            <div className={S.card}>
              <Icon name="yiqixinghao" size={32} />
              <div className={S.name}>{os?.name}</div>
              <div className={S.version}>{os?.version}</div>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={loading} active={true}>
          <div className={S.subtitle}>UserAgent</div>
          <div className={S.ua}>{ua}</div>
          <div className={S.subtitle}>堆栈信息</div>
          <div>
            {stacks.map((stack) => {
              return <div className={S.stack}>{stack}</div>;
            })}
          </div>
        </Skeleton>
      </div>
    );
  };

  return (
    <Drawer width={600} className={S.container} placement="right" onClose={onClose} open={open} closable={false}>
      {renderContent()}
    </Drawer>
  );
}
