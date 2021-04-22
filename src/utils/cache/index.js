import { getStorageShortName } from '/@/utils/env.js';
import { createStorage as create } from './storageCache.js';
import {
  enableStorageEncryption,
  DEFAULT_CACHE_TIME,
} from '/@/settings/encryptionSetting.js';

const createOptions = (storage, options = {}) => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export const WebStorage = create(createOptions(sessionStorage));

console.log(create());

export const createStorage = (storage = sessionStorage, options = {}) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options = {}) => {
  return createStorage(sessionStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

console.log(createSessionStorage());

export const createLocalStorage = (options = {}) => {
  return createStorage(localStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

export default WebStorage;
