const NOT_ALIVE = 0;
export class Memory {
  #cache = {}; //#代表私有，es6提案
  #alive = 0;
  constructor(alive = NOT_ALIVE) {
    this.#alive = alive * 1000;
  }

  get getCache() {
    return this.#cache;
  }

  setCache(cache) {
    this.#cache = cache;
  }

  get(key) {
    return this.#cache[key];
  }

  set(key, value, expires) {
    let item = this.get(key);
    if (!expires || expires <= 0) {
      expires = this.#alive;
    }
    if (item) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId);
        item.timeoutId = undefined;
      }
      item.value = value;
    } else {
      item = { value, alive: expires }; //这个alive哪里来的??
      this.#cache[key] = item;
    }
    if (!expires) {
      return value;
    }

    const now = new Date().getTime();
    item.time = now + this.#alive;
    item.timeoutId = setTimeout(
      () => {
        this.remove(key);
      },
      expires > now ? (expires = now) : expires
    );

    return value;
  }

  remove(key) {
    const item = this.get(key);
    Reflect.deleteProperty(this.#cache, key);
    if (item) {
      clearTimeout(item.timeoutId);
      return item.value;
    }
  }

  resetCache(cache) {
    Object.keys(cache).forEach((key) => {
      const k = key;
      const item = cache[k];
      if (item && item.time) {
        const now = new Date().getTime();
        const expires = item.time;
        if (expires > now) {
          this.set(k, item.value, expires);
        }
      }
    });
  }

  clear() {
    Object.keys(this.#cache).forEach((key) => {
      const item = this.#cache[key];
      item.timeoutId && clearTimeout(item.timeoutId);
    });
    this.#cache = {};
  }
}
