export const formItems = [{}];
export const phoneRules = [
  {
    required: true,
    message: '请输入手机号!',
  },
  {
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入正确的手机格式',
  },
];

export const pswRules = [
  {
    required: true,
    message: '请输入密码！',
  },
  {
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+)[0-9A-Za-z]{6,18}$/,
    message: '‌密码长度为6到18位，包含字母和数字',
  },
];
