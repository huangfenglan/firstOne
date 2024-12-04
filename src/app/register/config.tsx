import { Input, InputNumber } from 'antd';
import { phoneRules, pswRules, emialRules } from '../config';
import { SelecetByPinyin } from '@/Components/CustomedFormChild';

const departments = [
  { department: '淘宝', id: 1 },
  { department: '天猫', id: 2 },
  { department: '阿里云', id: 3 },
  { department: '蚂蚁', id: 4 },
  { department: '橙盾', id: 5 },
  { department: '天猫国际', id: 6 },
  { department: 'tianmao', id: 7 },
];

const MAXAGE = 60;

export const userRegisterFormItems = (isEdit: boolean) =>
  [
    {
      label: '昵称',
      name: 'nickName',
      children: <Input placeholder="请输入昵称" />,
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
      children: <Input placeholder="请输入手机号" disabled={isEdit} />,
      rules: [...phoneRules],
    },
    {
      label: '邮箱',
      name: 'email',
      children: <Input placeholder="请输入邮箱" />,
      rules: [...emialRules],
    },
    {
      label: '年龄',
      name: 'age',
      children: (
        <InputNumber
          min={0}
          max={MAXAGE}
          placeholder="请输入年龄"
          style={{ width: '100%' }}
        />
      ),
      extra: (
        <span style={{ fontSize: '10px' }}>最大输入年龄为：{`${MAXAGE}`}</span>
      ),
      rules: [
        {
          required: true,
          message: '请输入年龄!',
        },
      ],
    },
    {
      label: '密码',
      name: 'password',
      children: <Input.Password placeholder="请输入密码" />,
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
          labelInValue
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
    {
      label: '描述',
      name: 'description',
      children: <Input.TextArea placeholder="请输入描述" />,
    },
  ].filter((val) => !!val);
