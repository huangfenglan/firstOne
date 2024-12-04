import { Button, Input, Space, Popconfirm } from 'antd';
import { User, Depart } from '@/services/userTs';
import type { FormInstance } from 'antd';

export const getcolumns = ({
  setIsOpen,
  form,
  deleteItemUpper,
  usersList,
  setRecord,
  curUserInfo,
}: {
  setIsOpen: (par: boolean) => void;
  form: FormInstance;
  deleteItemUpper: (par: User) => void;
  usersList: User[];
  setRecord: (record: User) => void;
  curUserInfo: User;
}) => {
  return [
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 180,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 200,
      render: (val: Depart) => val?.label,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      fixed: 'right',
      width: 180,
      render: (_: any, record: User) => {
        const {
          department: { ...rest },
          phone,
        } = record;
        const { phone: curUserPhone } = curUserInfo;
        const isUer = phone === curUserPhone;
        return isUer ? null : (
          <Space>
            <Button
              key="edit"
              type="primary"
              onClick={() => {
                setRecord(record);
                form.setFieldsValue({ ...record, department: [rest] });
                setIsOpen(true);
              }}
            >
              编辑
            </Button>

            <Popconfirm
              key="del"
              title="您确定要删除该用户吗？"
              onConfirm={() => deleteItemUpper({ ...record, usersList })}
            >
              <Button color="danger" variant="dashed">
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
};

export const formLists = [
  {
    label: '姓名',
    name: 'name',
    // key: 'name',
    children: <Input />,
    rules: [
      {
        required: true,
        message: '请输入姓名',
      },
    ],
  },
  {
    label: '年龄',
    name: 'age',
    // key: 'name',
    children: <Input />,
    rules: [
      {
        required: true,
        message: '请输入年龄',
      },
    ],
  },
  {
    label: '地址',
    name: 'address',
    children: <Input />,
    rules: [
      {
        required: true,
        message: '请输入地址',
      },
    ],
  },
];
