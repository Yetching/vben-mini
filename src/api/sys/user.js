// import { defHttp } from '/@/utils/http/axios/Axios';

const Api = {
  Login: '/login',
  GetUserInfoById: '/getUserInfoById',
  GetPermCodeByUserId: '/getPermCodeByUserId',
};

export function loginApi(params, mode = 'modal') {
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

export function getUserInfoById(params) {
  return defHttp.get({
    url: Api.GetUserInfoById,
    params,
  });
}

export function getPermCodeByUserId(params) {
  return defHttp.get({
    url: Api.GetPermCodeByUserId,
    params,
  });
}
