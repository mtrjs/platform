import { Modal, Form, Input, Radio, message, Switch } from 'antd';
import { ModalProps } from 'antd/es/modal';
import React, { useEffect } from 'react';
import S from './index.module.less';
import DatePicker from '@components/date-picker';
import dayjs from 'dayjs';
import FormRule from '../form-rule';
import { AlarmNotification, AlarmRule, CreateAlarmRuleParams, IAlarmRule, updateAlarmRule } from '@api/alarm';
import FormNotification from '../form-notification';

const { RangePicker } = DatePicker;
interface Props extends ModalProps {
  onClose(): void;
  data?: IAlarmRule;
}

interface FormType {
  name: string;
  cycle: number;
  rule: AlarmRule[];
  notification: AlarmNotification[];
  check_time?: dayjs.Dayjs[];
  enabled: boolean;
}

const initialValues = {
  cycle: 30,
  check_time: [dayjs().startOf('d').add(10, 'h'), dayjs().startOf('d').add(19, 'h')],
  rule: [],
  enabled: true,
  notification: [],
};

export default function CreateAlarmRule(props: Props) {
  const { data, onClose, ...restProps } = props;

  const [form] = Form.useForm<FormType>();

  const isEdit = !!data;

  const onCreate = async () => {
    const { name, cycle, check_time, enabled, rule, notification } = await form.validateFields();

    const { id } = data || {};

    if (new Set(rule.map((o) => o.type)).size < rule.length) {
      message.error('存在重复规则!');
      return;
    }

    const { createdAt } = data || {};

    const body: CreateAlarmRuleParams = {
      name,
      cycle,
      rule,
      enabled,
      notification,
      createdAt,
    };

    if (isEdit) {
      body.id = id;
    }

    if (check_time) {
      body.checkTimeEndAt = check_time[1]?.format('HH:mm');
      body.checkTimeStartAt = check_time[0]?.format('HH:mm');
    }

    await updateAlarmRule(body);

    onClose?.();
    message.success(isEdit ? '更新成功!' : '创建成功!');
  };

  useEffect(() => {
    if (!data) {
      form.setFieldsValue(initialValues);
      return;
    }
    const { cycle, checkTimeStartAt = '', checkTimeEndAt = '', rule, notification, enabled, name } = data;
    const [startAtHour, startAtMinutes] = checkTimeStartAt.split(':');
    const [endAtHour, endAtMinutes] = checkTimeEndAt.split(':');

    form.setFieldsValue({
      cycle,
      check_time: [
        dayjs().set('hour', Number(startAtHour)).set('minute', Number(startAtMinutes)).set('second', 0),
        dayjs().set('hour', Number(endAtHour)).set('minute', Number(endAtMinutes)).set('second', 0),
      ],
      rule,
      notification,
      enabled,
      name,
    });
  }, [data, form]);

  return (
    <Modal title="规则创建" className={S.container} onOk={onCreate} width={800} destroyOnClose={true} {...restProps}>
      <Form form={form} initialValues={initialValues} labelCol={{ span: 4 }}>
        <Form.Item label="规则名称" rules={[{ required: true, message: '请输入规则名称' }]} name="name">
          <Input placeholder="请输入规则名称" style={{ width: 280 }} />
        </Form.Item>
        <Form.Item label="检查周期" name="cycle">
          <Radio.Group>
            <Radio value={10}>10分钟</Radio>
            <Radio value={30}>30分钟</Radio>
            <Radio value={60}>1个小时</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="检查时间段"
          tooltip="每天检查的时间段限制"
          rules={[{ required: true, message: '请选择检查时间段' }]}
          name="check_time"
        >
          <RangePicker picker="time" />
        </Form.Item>
        <Form.Item label="是否开启" name="enabled" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="规则" name="rule">
          <FormRule />
        </Form.Item>
        <Form.Item label="通知方式" name="notification">
          <FormNotification />
        </Form.Item>
      </Form>
    </Modal>
  );
}
