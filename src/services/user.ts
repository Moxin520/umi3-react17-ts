import request from '@/utils/request';

export const getLoginApi = (): any => {
  return request('/user/login');
};

export const getLogOutApi = (): any => {
  return request('/user/logOut');
};
