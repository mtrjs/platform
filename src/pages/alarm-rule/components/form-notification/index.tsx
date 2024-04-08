/* eslint-disable react/no-array-index-key */
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select } from 'antd';
import { AlarmNotification, AlarmNoticeType } from '@api/alarm';
import React, { useEffect } from 'react';
import S from './index.module.less';

interface Props {
  value?: AlarmNotification[];
  onChange?(arg: AlarmNotification[]): void;
}

const ruleTypeOptions = [
  { label: '企微机器人', value: AlarmNoticeType.wecom },
  { label: '邮箱', value: AlarmNoticeType.mail },
];

const defaultValue = [{ type: AlarmNoticeType.wecom, value: '' }];

export default function FormNotice(props: Props) {
  const { value = [], onChange } = props;

  const handleChange = (index: number, obj: Record<string, any>) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], ...obj };
    onChange?.(newValue);
  };

  const renderLabel = (type: AlarmNoticeType) => {
    if (type === AlarmNoticeType.wecom) {
      return 'Webhook 地址:';
    }
    return '';
  };

  useEffect(() => {
    if (!value.length) {
      onChange?.(defaultValue);
    }
  }, [value]);

  return (
    <Col className={S.container}>
      {value.map((o, index) => {
        const { type, value: _value } = o;

        return (
          <Row align="middle" className={S.item} key={index}>
            <Select
              placeholder="请选择"
              options={ruleTypeOptions}
              value={type}
              style={{ width: 130 }}
              onChange={(type) => {
                const newValue = [...value];
                newValue[index].type = type;
                onChange?.(newValue);
              }}
            />

            <span style={{ marginLeft: 10 }}>{renderLabel(type)}</span>
            <Input
              style={{ marginLeft: 5, width: 300 }}
              placeholder="请输入"
              value={_value}
              onChange={(e) => {
                handleChange(index, { value: e.target.value });
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
                        value: '',
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
