import { mockFetch } from '../utils/request';

export const registerUsers = async (values: any) => {
  return mockFetch('/users/registerUser', 'post', values);
};

export const loginUsers = async (values: any) => {
  return mockFetch('/users/login', 'post', values);
};
