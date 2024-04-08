import React from 'react';
import { Card, Descriptions, Divider, Spin } from 'antd';
import S from './index.module.less';
import { useRequest } from 'ahooks';
import { getPerfDetail } from '@api/perf';
import { useLocation } from 'react-router-dom';
import Icon from '@components/Iconfont';
import Waterfall from './waterfall';

export default function PerformanceDetail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const { data, loading } = useRequest(() => {
    if (!id) return Promise.reject();
    return getPerfDetail({ id });
  });
  const { fcp, lcp, createdAt, contentName, contentId, browserName, browserVersion, osName, osVersion, resource } =
    data || {};

  return (
    <Spin spinning={loading}>
      <Card className={S.container}>
        <Descriptions title="作品信息" bordered={true}>
          <Descriptions.Item label="作品名称">{contentName}</Descriptions.Item>
          <Descriptions.Item label="作品ID">{contentId}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions title="数据总览" bordered={true} column={2}>
          <Descriptions.Item label="FCP">{fcp}ms</Descriptions.Item>
          <Descriptions.Item label="LCP">{lcp}ms</Descriptions.Item>
          <Descriptions.Item label="发生时间">{createdAt}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <div className={S.subtitle}>设备信息</div>
        <div className={S.device}>
          <div className={S.card}>
            <Icon name="shebeileixing" size={30} />
            <div className={S.name}>{browserName}</div>
            <div className={S.version}>{browserVersion}</div>
          </div>
          <div className={S.card}>
            <Icon name="yiqixinghao" size={32} />
            <div className={S.name}>{osName}</div>
            <div className={S.version}>{osVersion}</div>
          </div>
        </div>
        <Divider />
        <div className={S.subtitle}>加载性能瀑布图</div>
        <Waterfall list={resource} fcp={fcp} lcp={lcp} />
      </Card>
    </Spin>
  );
}
