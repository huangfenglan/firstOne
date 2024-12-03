import { Input, Select } from 'antd';
import { Children } from 'react';
import { phoneRules, pswRules } from '../login/config';
import { SelecetByPinyin } from '@/Components/CustomedFormChild';

const departments = [
  { department: '淘宝', id: 0 },
  { department: '天猫', id: 1 },
  { department: '阿里云', id: 2 },
  { department: '蚂蚁', id: 3 },
  { department: '橙盾', id: 4 },
  { department: '天猫国际', id: 5 },
  { department: 'tianmao', id: 6 },
];

export const userRegisterFormItems = () => [
  {
    label: '昵称',
    name: 'nickName',
    children: <Input />,
    rules: [
      {
        required: true,
        message: '请输入昵称!',
      },
    ],
  },
  {
    label: '手机号',
    name: 'phone',
    children: <Input />,
    rules: [...phoneRules],
  },
  {
    label: '密码',
    name: 'password',
    children: <Input />,
    rules: [...pswRules],
  },
  {
    label: '确认密码',
    name: 'confirmPassword',
    children: <Input />,
    rules: [...pswRules],
  },
  {
    label: '部门',
    name: 'department',
    children: (
      <SelecetByPinyin
        options={departments}
        showSearch
        // maxCount={1}
        fieldNames={{ label: 'department', value: 'id' }}
      />
    ),
    rules: [
      {
        required: true,
        message: '请至少选择一个部门!',
      },
    ],
  },
];
