import React, { useEffect } from 'react';
import { Input, Row, Select } from 'antd';

interface Props {
  value?: [number, string];
  onChange?(value: [number | undefined, string | undefined]): void;
}

const options = [
  { label: '大于', value: 1 },
  { label: '小于', value: 2 },
];

export default function ThresholdInput(props: Props) {
  const { value = [], onChange } = props;

  useEffect(() => {
    if (value[0] === undefined) onChange?.([options[0].value, value[1]]);
  }, []);

  return (
    <Row>
      <Select
        style={{ width: 80 }}
        value={value[0] || options[0].value}
        options={options}
        onChange={e => {
          onChange?.([e, value[1]]);
        }}
      />
      <Input
        style={{ width: 120 }}
        value={value[1]}
        placeholder="请输入阈值"
        onChange={e => {
          onChange?.([value[0], e.target.value]);
        }}
      />
    </Row>
  );
}
