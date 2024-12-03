import { Button, Input } from 'antd';

export const getcolumns = ({ setIsOpen, form }: any) => {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: (_: any, record: any) => {
        return (
          <Button
            onClick={() => {
              form.setFieldsValue({ ...record });
              // setCurRecord(record)
              setIsOpen(true);
            }}
          >
            编辑
          </Button>
        );
      },
    },
  ];
};

export const formLists = [
  {
    label: '姓名',
    name: 'name',
    key: 'name',
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
    key: 'age',
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
    key: 'address',
    children: <Input />,
    rules: [
      {
        required: true,
        message: '请输入地址',
      },
    ],
  },
];
