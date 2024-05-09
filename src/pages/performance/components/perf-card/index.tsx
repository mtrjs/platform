import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import React from 'react';
import S from './index.module.less';

export default function PerformanceCard(props: {
  label: string;
  help?: string;
  value?: number;
  style?: React.CSSProperties;
  good: number;
  less: number;
}) {
  const { label, help, value, style, good, less } = props;

  const textColor = value
    ? value <= good
      ? 'rgb(40, 201, 137)'
      : value <= less
      ? 'rgb(255, 151, 36)'
      : 'rgb(255, 78, 92)'
    : '';

  const text = value ? `${value}${label !== 'CLS' ? 'ms' : ''}` : '-';

  return (
    <Card
      className={S['performance-card']}
      style={style}
      title={
        <div className={S.help}>
          <div className={S.label}>{label}</div>
          {help && (
            <Tooltip title={help}>
              <QuestionCircleOutlined size={30} className={S.icon} />
            </Tooltip>
          )}
        </div>
      }
    >
      <div className={S.value} style={{ color: textColor }}>
        {text}
      </div>
    </Card>
  );
}
