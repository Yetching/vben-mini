import { defHttp } from '/@/utils/http/axios';

const Api = {
  GetMenuListById: '/getMenuListById',
};

export const getMenuListById = (params) => {
  return defHttp.get({ url: Api.GetMenuListById, params });
};
