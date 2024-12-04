'use client';

import { Card, Form } from 'antd';
import { userRegisterFormItems } from './config';
import CustomedForm from '@/Components/CustomedFrom';
import { registerUsers } from '@/mock/users';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/store/conut';
import { FormItemProps, User } from '@/services/userTs';
import Link from 'next/link';

const { Item } = Form;
interface Redux {
  conut: { usersList: User[] };
}

export default () => {
  const dispatch = useDispatch();
  const usersList = useSelector(({ conut: { usersList } }: Redux) => usersList);

  const [form] = Form.useForm();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState(false);

  //登录
  const onFinish = async (values: User) => {
    setIsFormLoading(true);
    const data = await registerUsers({ ...values, usersList }).finally(() =>
      setIsFormLoading(false)
    );

    dispatch(addUser(data));
    router.push('/');
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
      <Card
        title="用户注册"
        style={{ width: 600 }}
        extra={<Link href="/">返回</Link>}
      >
        <CustomedForm
          form={form}
          onFinish={onFinish}
          isBtnLoading={isFormLoading}
        >
          {userRegisterFormItems(false).map((val: FormItemProps) => (
            <Item {...val} key={val?.name} />
          ))}
        </CustomedForm>
      </Card>
    </div>
  );
};
