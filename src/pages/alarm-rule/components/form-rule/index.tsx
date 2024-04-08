/* eslint-disable react/no-array-index-key */
import { Col, InputNumber, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import S from './index.module.less';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AlarmRule } from '@api/alarm';

interface Props {
  value?: AlarmRule[];
  onChange?(arg: AlarmRule[]): void;
}

const ruleTypeOptions = [
  { label: 'JS异常次数', value: 'jsExceptionTimes' },
  { label: '资源异常次数', value: 'resourceExceptionTimes' },
  { label: 'Request 请求异常次数', value: 'requestExceptionTimes' },
  { label: 'FCP 指标均值', value: 'fcpAvg' },
  { label: 'LCP 指标均值', value: 'lcpAvg' },
  { label: 'TTFB 指标均值', value: 'ttfbAvg' },
];

const defaultThreshold = 300;
const defaultTimes = 1;

const defaultValue = [{ type: 'jsExceptionTimes', threshold: 300, times: 1 }];

export default function FormRule(props: Props) {
  const { value = [], onChange } = props;

  const handleChange = (index: number, obj: Record<string, any>) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], ...obj };
    onChange?.(newValue);
  };

  useEffect(() => {
    if (!value.length) {
      onChange?.(defaultValue);
    }
  }, [value]);

  return (
    <Col className={S.container}>
      {value.map((o, index) => {
        const { type, threshold, times } = o;

        return (
          <Row align="middle" className={S.item} key={index}>
            <Select
              placeholder="请选择"
              options={ruleTypeOptions}
              value={type}
              style={{ width: 150 }}
              onChange={(type) => {
                const newValue = [...value];
                newValue[index].type = type;
                onChange?.(newValue);
              }}
            />
            <span style={{ marginLeft: 12 }}>阈值:</span>
            <Select
              placeholder="请选择"
              options={[{ label: '>=', value: 0 }]}
              style={{ width: 70, marginLeft: 5 }}
              defaultValue={0}
            />
            <InputNumber
              placeholder="请输入"
              value={threshold}
              onChange={(value) => {
                handleChange(index, { threshold: value });
              }}
            />
            <span style={{ marginLeft: 10 }}>告警次数:</span>
            <InputNumber
              style={{ marginLeft: 5 }}
              placeholder="请输入"
              value={times}
              onChange={(value) => {
                handleChange(index, { times: value });
              }}
            />
            {index === value.length - 1 && value.length < ruleTypeOptions.length && (
              <PlusCircleOutlined
                className={S.plus}
                onClick={() => {
                  onChange?.(
                    value.concat([
                      {
                        type: ruleTypeOptions[0].value,
                        threshold: defaultThreshold,
                        times: defaultTimes,
                      },
                    ])
                  );
                }}
              />
            )}

            {value.length > 1 && (
              <CloseCircleOutlined
                className={S.delete}
                onClick={() => {
                  onChange?.([...value.slice(0, index), ...value.slice(index + 1)]);
                }}
              />
            )}
          </Row>
        );
      })}
    </Col>
  );
}
