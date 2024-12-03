const getResult = (data = {}, code = 200, message = '请求成功') => {
  return {
    code,
    message,
    data: { ...data },
  };
};

export let userList: any[] = [];
const portsObj: any = {
  '/users/registerUser_post': (data) => {
    const { phone } = data;
    let code = 200;
    let message = '请求成功';
    const isHas = userList.filter(
      ({ phone: curPhone }: any) => curPhone === phone
    ).length;
    console.log(userList, '是否存在', isHas);

    if (!!isHas) {
      code = 0;
      message = '当前用已经存在，请直接进行登陆';
    }
    userList = [{ ...data }, ...userList];

    return getResult({}, code, message);
  },
  '/users/login_post': (data: any) => {
    const { phone, password } = data;
    let code = 200;
    let message = '登录成功';
    const isRight = userList.some(
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

export const getMockData = (key: any, data: any) => {
  return portsObj[key](data);
};
