'use client';

import CustomedTable from '@/Components/CustomedTable';
import { getcolumns } from './config';
import { Card, Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import CustomModalForm from '@/Components/CustomModalForm';
import useTaskHooks from './hooks';
import moment from 'moment';
import { registerUsers } from '@/mock/users';
import { updateUsers, deleteItem } from './methods';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateCurUserInfo } from '@/store/conut';
import { userRegisterFormItems } from '../../register/config';
import { User } from '@/services/userTs';

interface Redux {
  conut: { usersList: User[] };
}

const defaultUser = {
  nickName: '',
  phone: '',
  age: 0,
  password: '',
  department: {
    label: '',
    value: '',
    key: 0,
  },
  description: '',
  createTime: '',
  updateTime: '',
  // defaultUser: [],
};

export default () => {
  const dispatch = useDispatch();
  // const [isEdit, setIsEdit] = useState(false);
  const [record, setRecord] = useState<User>(defaultUser);
  const conut = useSelector(({ conut }: Redux) => conut);
  const { usersList, curUserInfo } = conut;
  const { form, isOpen, setIsOpen } = useTaskHooks();

  const deleteItemUpper = async (record: User) => {
    const result = await deleteItem({ ...record });
    dispatch(updateCurUserInfo(result));
  };

  const columns = useMemo(
    () =>
      getcolumns({
        usersList,
        setIsOpen,
        form,
        setRecord,
        deleteItemUpper,
        curUserInfo,
      }),
    [usersList, curUserInfo]
  );

  //table的配置
  const tableConfig = {
    url: '/user/list',
    columns,
  };

  //form的配置
  const modalFormProps = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      form,
      formItems: userRegisterFormItems(!!record?.phone),
      onFinish: async (values: User) => {
        const { createTime, updateTime } = record;
        if (!!record?.phone) {
          const result = await updateUsers({
            createTime,
            updateTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            ...values,
            usersList,
          });
          dispatch(updateCurUserInfo(result));
        } else {
          const data = await registerUsers({ ...values, usersList });
          dispatch(addUser(data));
        }
      },
    }),
    [isOpen]
  );

  useEffect(() => {
    !isOpen && form.resetFields();
  }, [isOpen]);

  return (
    <>
      <Card
        bordered={false}
        title={
          <>
            <Button
              key="add"
              type="primary"
              onClick={() => {
                setRecord(defaultUser);
                setIsOpen(true);
              }}
            >
              新增
            </Button>
          </>
        }
      >
        <CustomedTable {...tableConfig} />
      </Card>

      <CustomModalForm {...modalFormProps} />
    </>
  );
};
