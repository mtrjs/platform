/*
 * request 异常趋势图
 *
 * @Author: 夏洁琼
 * @Date: 2023-04-06 10:28:14
 *
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */

import React, { useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Area } from '@antv/g2plot';
import { Card } from 'antd';
import S from './index.module.less';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@constants/routes';
import { ITrend } from '@api/exception';

interface Props {
  loading?: boolean;
  data?: ITrend[];
}
export default function RequestException(props: Props) {
  const { data, loading } = props;

  useEffect(() => {
    let charts: Area;

    if (data) {
      charts = new Area('request-exception-container', {
        data,
        xField: 'date',
        yField: 'value',
        annotations: [
          {
            type: 'text',
            position: ['min', 'median'],
            content: '中位数',
            offsetY: -4,
            style: {
              textBaseline: 'bottom',
            },
          },
          {
            type: 'line',
            start: ['min', 'median'],
            end: ['max', 'median'],
            style: {
              stroke: 'red',
              lineDash: [2, 2],
            },
          },
        ],
      });
      charts.render();
    }

    return () => {
      charts?.destroy();
    };
  }, [data]);
  return (
    <Card
      loading={loading}
      title={
        <Link className={S.title} to={ROUTE_PATH.requestExceptionList}>
          <div className={S.label}>请求异常</div>
          <RightOutlined className={S.icon} />
        </Link>
      }
    >
      <div id="request-exception-container" style={{ height: 300 }} />
    </Card>
  );
}
