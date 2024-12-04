import { UserOutlined } from '@ant-design/icons';

const LAYOUTMENUS = [
  // {
  //   key: '/pages/redGreen',
  //   icon: <UserOutlined />,
  //   label: '红路灯',
  //   keypath: '/pages/redGreen',
  // },
  // {
  //   key: '/pages',
  //   icon: <UserOutlined />,
  //   label: '测试redux',
  //   keypath: '/pages',
  // },
  {
    key: '/pages/users',
    icon: <UserOutlined />,
    label: '用户',
    keypath: '/pages/users',
  },
  // {
  //   key: '/pages/queue',
  //   icon: <UserOutlined />,
  //   label: '测试',
  //   keypath: '/pages/queue',
  // },
  // {
  //   key: '/pages/interview',
  //   icon: <UserOutlined />,
  //   label: '微前端',
  //   keypath: '/pages/interview',
  // },
];

const NOLAYOUT = ['/pages/logIn', '/pages/register'];
export { LAYOUTMENUS, NOLAYOUT };
