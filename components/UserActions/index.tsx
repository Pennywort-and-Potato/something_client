import { userLogin, userRegister } from '@/pages/api/api';
import { ExportOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Popover,
  Space,
  Tabs,
} from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocalStorage } from 'usehooks-ts';

const { Item } = Form;

const renderForm = (callback: any) => {
  const compactStyles = {
    display: 'inline-block',
    width: 'calc(48%)',
    margin: '0px',
  };

  const loginForm = (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={(values) => callback('login', values)}
      autoComplete={'on'}
    >
      <Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Item>
      <Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Item>
      <Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType='submit'>Login</Button>
      </Item>
    </Form>
  );

  const registerForm = (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={(values) => callback('register', values)}
      autoComplete={'on'}
    >
      <Item label='Username' name='username' required>
        <Input />
      </Item>
      <Item label='Email' name='email' required>
        <Input />
      </Item>
      <Item label='Password' name='password' required>
        <Input.Password />
      </Item>
      <Item label='Name'>
        <Item name='first_name' style={compactStyles}>
          <Input placeholder='First Name' />
        </Item>
        <Item name='last_name' style={{ ...compactStyles, marginLeft: 8 }}>
          <Input placeholder='Last Name' />
        </Item>
      </Item>
      <Item label='Date of birth' name='date_of_birth' required>
        <DatePicker />
      </Item>
      <Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType='submit'>Register</Button>
      </Item>
    </Form>
  );

  return (
    <Tabs
      defaultActiveKey='login'
      items={[
        {
          key: 'login',
          label: 'Login',
          children: loginForm,
        },
        {
          key: 'register',
          label: 'Register',
          children: registerForm,
        },
      ]}
    />
  );
};

const UserActions = (props: any) => {
  const user = useSelector((state: any) => state.user.user);
  const [token, setToken] = useLocalStorage<string>('jwt', '');

  const callbackActions = (action: string, values: any) => {
    if (action === 'login') {
      return userLogin(values).then((res) => {
        setToken(res.jwt);
      });
    }

    if (action === 'register') {
      return userRegister(values).then((res) =>
        message.success('Registration Successfully')
      );
    }
  };

  return (
    <>
      {user ? (
        <Popover
          content={
            <Space direction='vertical' align='center'>
              <Avatar style={{ cursor: 'pointer' }}>{user.username}</Avatar>
              <Button
                type='text'
                onClick={() => setToken('')}
                icon={<ExportOutlined />}
              >
                Logout
              </Button>
            </Space>
          }
          arrow={false}
          placement='bottomRight'
        >
          <Button type='text' style={{ letterSpacing: 2 }}>{user.username}</Button>
        </Popover>
      ) : (
        <Popover
          trigger={'click'}
          content={renderForm(callbackActions)}
          placement='bottomRight'
          arrow={false}
        >
          <Button type='text' style={{ letterSpacing: 2 }}>
            Login
          </Button>
        </Popover>
      )}
    </>
  );
};

export default UserActions;
