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
}

interface Props extends ModalProps {
  onClose(): void;
}

export default function CreateApp(props: Props) {
  const { onClose, ...restProps } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [form] = useForm<AppInfo>();

  const onCreate = async () => {
    const { name, type } = await form.validateFields();
    await createApplication({ name, type });
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
      </Form>
    </Modal>
  );
}
