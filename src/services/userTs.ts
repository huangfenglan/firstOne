interface Depart {
  label: string;
  value: number | string;
  key: number | string;
}

interface User {
  nickName: string;
  phone: number | string;
  age: number;
  password: string;
  department: Depart;
  description?: string;
  createTime?: string;
  updateTime?: string;
  usersList?: User[];
}

interface FormItemProps {
  label?: string;
  name: string;
  children: React.ReactNode | string | number;
  rules?: any[];
  extra?: React.ReactNode | string | number;
}

export type { User, Depart, FormItemProps };
