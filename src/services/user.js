import Request, { endpoints, METHOD } from '@/utils/request';

export const userLogin = (params) => {
  return Request(endpoints.login, {
    method: METHOD.POST,
    data: params,
  });
}

export const getUserProfile = () => {
  return Request(endpoints.userInfo, {
    method: METHOD.GET,
  });
};
