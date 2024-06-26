import classNames from 'classnames';
import React from 'react';
import './iconfont.css';

type IconName =
  | 'time'
  | 'yiqixinghao'
  | 'shebeileixing'
  | 'xitongxingneng'
  | 'fenxi'
  | 'xingneng'
  | 'liebiao'
  | 'tongjifenxi'
  | 'zhibiaofenxi'
  | 'tongjifenxi1'
  | 'tongjifenxi2'
  | 'shujufenxi'
  | 'list'
  | 'wangluo'
  | 'ziyuan-xianxing'
  | 'js'
  | 'w_fenbu'
  | 'mac'
  | 'Android'
  | 'Windows'
  | 'WeChat'
  | 'chrome'
  | 'mac1'
  | 'Edge-01'
  | 'IE'
  | 'Safariliulanqi'
  | 'firefox';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  name: IconName;
  size?: number;
  style?: React.CSSProperties;
  className?: any;
}

function Component(props: Props) {
  const { name, className, size = 20, style, ...restProps } = props;
  return (
    <span
      className={classNames('iconfont', `icon-${name}`, className)}
      style={{ fontSize: size, cursor: 'pointer', ...style }}
      {...restProps}
    />
  );
}

export default Component;
