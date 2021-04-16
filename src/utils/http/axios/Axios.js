import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '/@/utils/is';
import { cloneDeep } from 'lodash-es';

import { errorResult } from './const';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';

// export * from './axiosTransform';

export class VAxios {
  #axiosInstance;
  #options;

  constructor(options) {
    this.#options = options;
    this.#axiosInstance = axios.create(options);
    this.#setupInterceptors();
  }

  #createAxios(config) {
    this.#axiosInstance = axios.create(config);
  }

  #getTransform() {
    const { transform } = this.#options;
    return transform;
  }

  getAxios() {
    return this.#axiosInstance;
  }

  configAxios(config) {
    if (!this.#axiosInstance) {
      return;
    }
    this.#createAxios(config);
  }

  setHeader(headers) {
    if (!this.#axiosInstance) {
      return;
    }
    Object.assign(this.#axiosInstance.defaults.headers, headers);
  }

  #setupInterceptors() {
    const transform = this.#getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;
    const axiosCanceler = new AxiosCanceler();

    this.#axiosInstance.interceptors.request.use((config) => {
      const {
        headers: { ignoreCancelToken },
      } = config;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.#options.requestOptions?.ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }
      return config;
    }, undefined);

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.#axiosInstance.interceptors.response.use(
        undefined,
        requestInterceptorsCatch
      );

    this.#axiosInstance.interceptors.response.use((res) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.#axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      );
  }

  uploadFile(config, params) {
    const formData = new window.FormData();

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        if (!params.data) return;
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, params.data[key]);
      });
    }

    formData.append(params.name || 'file', params.file, params.filename);
    return this.#axiosInstance.request({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }

  supportFormDate(config) {
    const headers = this.#options?.headers;
    const contentType = headers?.['Content-type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data),
    };
  }

  get(config, options) {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post(config, options) {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put(config, options) {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete(config, options) {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request(config, options) {
    let conf = cloneDeep(config);
    const transform = this.#getTransform();

    const { requestOptions } = this.#options;

    const opt = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformRequestHook } =
      transform || {};

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    conf = this.supportFormDate(conf);

    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .request(conf)
        .then((res) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            const ret = transformRequestHook(res, opt);
            ret !== errorResult
              ? resolve(ret)
              : reject(new Error('request error!!!'));
            return;
          }
          resolve(res);
        })
        .catch((e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e));
            return;
          }
          reject(e);
        });
    });
  }
}
