import { Button, Form, Input } from 'antd';
import S from './index.module.less';
import { login } from '@api/user';
import { useDispatch } from 'react-redux';
import userSlice from '@slices/user';

interface UserForm {
  account: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const handleSubmit = async (user: UserForm) => {
    const { account, password } = user;
    const { data } = await login({ account, password });

    const { access_token } = data || {};
    dispatch(userSlice.actions.setUserInfo({ access_token }));
    setTimeout(() => {
      window.location.replace('/');
    }, 100);
  };
  return (
    <div className={S.container}>
      <Form<UserForm> labelCol={{ span: 4 }} onFinish={handleSubmit} className={S.content} size="large">
        <Form.Item label="用户名" name="account" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" className={S.submit}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
