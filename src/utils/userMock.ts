import moment from 'moment';
import { User } from '@/services/userTs';

const li = '/users/registerUser_post';

type PortsObjTs = {
  [key: string]: (data: User) =>
    | {
        code: number;
        message: string;
        data: {};
      }
    | undefined;
};

const getResult = (data = {}, code = 200, message = '请求成功') => {
  return {
    code,
    message,
    data: { ...data },
  };
};

// export let userList: any[] = [];
const portsObj: PortsObjTs = {
  '/users/registerUser_post': (data: User) => {
    const { phone, usersList = [], ...rest } = data;
    let code = 200;
    let message = '请求成功';
    const timstamp = new Date();
    const curTime = moment(timstamp).format('YYYY-MM-DD HH:mm:ss');

    const isHas = usersList.filter(
      ({ phone: curPhone }: { phone: number | string }) => curPhone === phone
    ).length;

    if (!!isHas) {
      code = 0;
      message = '当前用已经存在，请直接进行登陆';
    }
    return getResult(
      { phone, ...rest, createTime: curTime, updateTime: curTime },
      code,
      message
    );
  },
  '/users/login_post': (data: User) => {
    const { phone, password, usersList = [] } = data;
    let code = 200;
    let message = '登录成功';
    const curUserInfo = usersList.filter(
      ({ phone: curPhone, password: psw }: User) =>
        curPhone === phone && psw === password
    );

    if (!curUserInfo?.length) {
      code = 0;
      message = '请确认手机和密码进行登录';
    }

    return getResult(curUserInfo[0] || {}, code, message);
  },
  '/users/delete_delete': (data: User) => {
    const { phone, password, usersList = [] } = data;
    let code = 200;
    let message = '登录成功';
    const isRight = usersList.some(
      ({ phone: curPhone, password: psw }: any) =>
        curPhone === phone && psw === password
    );

    if (!isRight) {
      code = 0;
      message = '请确认手机和密码进行登录';
    }
    return getResult({}, code, message);
  },
};

export const getMockData = (key: string, data: any) => {
  const func: any = portsObj[key];
  return func(data);
};
