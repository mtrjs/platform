/*
 * 优化超长文字列的展示
 *
 * @Author: 夏洁琼
 * @Date: 2023-05-04 14:45:25
 *
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */

import { Tooltip, message } from 'antd';
import type { TooltipPropsWithTitle } from 'antd/es/tooltip';
import React, { PropsWithChildren } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import S from './index.module.less';

interface Props extends Omit<TooltipPropsWithTitle, 'title'> {
  width?: number;
  maxWidth?: number;
  maxLength?: number;
  copy?: boolean;
}

export default function EllipsisColumn(props: PropsWithChildren<Props>) {
  const { children, maxWidth, width, maxLength, copy: _copy = true, ...restProps } = props;

  const isText = typeof children === 'string' && !!children;

  let title = children;
  if (isText && maxLength && children.length > maxLength) {
    title = `${children.substring(0, maxLength)}...`;
  }

  return (
    <Tooltip {...restProps} title={title}>
      <div className={S.container} style={{ maxWidth, width }}>
        <div className={S.title}>{children || '无'}</div>
        {isText && _copy && (
          <CopyOutlined
            className={S.icon}
            onClick={() => {
              // copy(children);
              message.success('复制成功!');
            }}
          />
        )}
      </div>
    </Tooltip>
  );
}
