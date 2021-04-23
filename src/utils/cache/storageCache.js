import { cacheCipher } from '/@/settings/encryptionSetting.js';
import { AesEncryption } from '/@/utils/cipher.js';
import { isNullOrUnDef } from '/@/utils/is.js';

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
} = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error(
      'when hasEncrypt is true, the key or iv must be 16 bits!!!'
    );
  }

  const encryption = new AesEncryption({ key, iv });

  const WebStorage = class WebStorage {
    storage;
    prefixKey;
    encryption;
    hasEncrypt;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    getKey(key) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    set(key, value, expire = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire)
          ? new Date().getTime() + expire * 1000
          : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
      console.log(`localStorage:${this.getKey(key)}字段设置完成`);
    }

    get(key, def) {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt
          ? this.encryption.decryptByAES(val)
          : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    remove(key) {
      this.storage.removeItem(this.getKey(key));
    }

    clear() {
      this.storage.clear();
    }
  };

  return new WebStorage();
};
