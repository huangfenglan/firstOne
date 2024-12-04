import { mockFetch } from '../utils/request';
import { User } from '@/services/userTs';

export const registerUsers = async (values: User) => {
  return mockFetch('/users/registerUser', 'post', values);
};

export const loginUsers = async (values: User) => {
  return mockFetch('/users/login', 'post', values);
};

export const deleteUser = async (values: User) => {
  return mockFetch('/users/delete', 'delete', values);
};
