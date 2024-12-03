'use client';

import { Card, Form } from 'antd';
import { userRegisterFormItems } from './config';
import CustomedForm from '@/Components/CustomedFrom';
import { registerUsers } from '@/mock/users';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const { Item } = Form;

export default () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const onFinish = async (values: any) => {
    setIsFormLoading(true);
    const data = await registerUsers(values);
    setIsFormLoading(false);
    // form.resetFields();
    router.push('/login');

    console.log(data, 'mock是否成功');
  };

  useEffect(() => {
    return () => form.resetFields();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card title="用户注册" style={{ width: 600 }}>
        <CustomedForm
          form={form}
          onFinish={onFinish}
          isBtnLoading={isFormLoading}
        >
          {userRegisterFormItems().map((val: any) => (
            <Item {...val} key={val?.name} />
          ))}
        </CustomedForm>
      </Card>
    </div>
  );
};
