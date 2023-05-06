import { Tooltip } from 'antd';
import type { TooltipPropsWithTitle } from 'antd/es/tooltip';
import { PropsWithChildren } from 'react';
import S from './index.module.less';

interface Props extends Omit<TooltipPropsWithTitle, 'title'> {
  width?: number;
}

export default function EllipsisColumn(props: PropsWithChildren<Props>) {
  const { children, width = 200, ...restProps } = props;
  return (
    <Tooltip {...restProps} title={children}>
      <div className={S.title} style={{ width }}>
        {children}
      </div>
    </Tooltip>
  );
}
