'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { Space, theme } from 'antd';
import { phoneRules, pswRules } from './config';
import { useRouter } from 'next/navigation';
import { loginUsers } from '@/mock/users';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserInfo } from '@/store/conut';
import { User } from '@/services/userTs';

interface Redux {
  conut: { usersList: User[] };
}

export default () => {
  const usersList = useSelector(({ conut: { usersList } }: Redux) => usersList);
  const dispatch = useDispatch();

  const { token } = theme.useToken();
  const router = useRouter();

  const onFinish = async (values: User) => {
    const data = await loginUsers({ ...values, usersList }).finally(() => true);
    dispatch(loginUserInfo(data));
    router.push('/pages/users');
    return true;
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="用户管理系统"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
          // height: '100vh',
        }}
        subTitle={
          <Space style={{ color: 'rgba(255,255,255,.5)' }}>
            <p>手机号：13166666666</p>
            <p>密码：123456w</p>
          </Space>
        }
        onFinish={onFinish}
      >
        <ProFormText
          name="phone"
          fieldProps={{
            size: 'large',
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
              />
            ),
          }}
          placeholder={'手机号: 请输入手机号'}
          rules={[...phoneRules]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: (
              <LockOutlined
                style={{
                  color: token.colorText,
                }}
              />
            ),
          }}
          placeholder={'密码: 请输入密码'}
          rules={[...pswRules]}
        />
        <div
          style={{
            marginBlockEnd: 24,
          }}
          onClick={() => router.push('/register')}
        >
          <a
            style={{
              float: 'right',
              marginBottom: '24px',
            }}
          >
            注册
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};
