import { getMockResult } from '@/utils/request';
import { User } from '@/services/userTs';

export const updateUsers = async (record: User) => {
  const { usersList = [], phone, ...rest } = record;
  const ohterUsers = usersList.filter(
    ({ phone: valPhone }: any) => valPhone !== phone
  );
  const result = await getMockResult(
    [{ phone, ...rest }, ...ohterUsers],
    '更新成功'
  );
  return result;
};

export const deleteItem = async (record: User) => {
  const { usersList = [], phone, ...rest } = record;
  const ohterUsers = usersList.filter(
    ({ phone: valPhone }) => valPhone !== phone
  );

  const result = await getMockResult([...ohterUsers], '删除成功');
  return result;
};
