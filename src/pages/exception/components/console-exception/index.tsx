import React, { useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Area } from '@antv/g2plot';
import { Card } from 'antd';
import S from './index.module.less';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@constants/routes';
import { ITrend } from '@api/exception';

interface Props {
  data?: ITrend[];
  loading?: boolean;
}

export default function JsException(props: Props) {
  const { data, loading } = props;

  useEffect(() => {
    let charts: Area;
    if (data) {
      charts = new Area('console-exception-container', {
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
        <Link className={S.title} to={ROUTE_PATH.consoleExceptionList}>
          <div className={S.label}>Console 异常</div>
          <RightOutlined className={S.icon} />
        </Link>
      }
    >
      <div id="console-exception-container" style={{ height: 300 }} />
    </Card>
  );
}
