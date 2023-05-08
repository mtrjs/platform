import { Checkbox, Form, Input, message, Modal, Radio } from 'antd';
import { ModalProps } from 'antd/es/modal';
import S from './index.module.less';
import { createApplication } from '@api/user';
import { useDispatch } from 'react-redux';
import { fetchApplicationList } from '@slices/application';
import { AppDispatch } from '@store/index';

const { useForm } = Form;

interface AppInfo {
  name: string;
  type: number;
  env: string[];
}

interface Props extends ModalProps {
  onClose(): void;
}

export default function CreateApp(props: Props) {
  const { onClose, ...restProps } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [form] = useForm<AppInfo>();

  const onCreate = async () => {
    const { name, type, env } = await form.validateFields();
    await createApplication({ name, type, env: env.join(',') });
    message.success('应用创建成功!');
    dispatch(fetchApplicationList());
    form.resetFields();
    onClose();
  };

  return (
    <Modal title="应用创建" className={S.container} {...restProps} onOk={onCreate}>
      <Form<AppInfo> form={form}>
        <Form.Item label="项目名称" rules={[{ required: true, message: '请输入项目名称' }]} name="name">
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item label="项目类型" rules={[{ required: true, message: '请选择项目类型' }]} name="type">
          <Radio.Group>
            <Radio value={0}>web/H5 应用</Radio>
            <Radio value={1}>小程序</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="运行环境" rules={[{ required: true, message: '请选择运行环境' }]} name="env">
          <Checkbox.Group>
            <Checkbox value="dev">dev</Checkbox>
            <Checkbox value="test">test</Checkbox>
            <Checkbox value="prod">prod</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
