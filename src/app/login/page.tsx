'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { Form, theme } from 'antd';
import { phoneRules, pswRules } from './config';
import { useRouter } from 'next/navigation';
import { loginUsers } from '@/mock/users';
import { userList } from '@/utils/userMock';

const Page = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  // const [isFormLoading, setIsFormLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const data = await loginUsers(values);
    router.push('/pages/users');
    return;
  };
  console.log(userList, 'userListuserList');

  return (
    <div
      style={{
        // backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title={<div style={{ color: 'white' }}>用户管理系统</div>}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
          // height: '100vh',
        }}
        subTitle={<div style={{ color: 'white' }}>用户管理系统</div>}
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
                className={'prefixIcon'}
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
                className={'prefixIcon'}
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

export default () => {
  return (
    // <ProConfigProvider dark>
    <Page />
    // </ProConfigProvider>
  );
};
