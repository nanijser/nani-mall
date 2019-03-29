import config from '@/config/';

class Storage {
  constructor() {
    this.storage = window.localStorage;
    this.prefix = config.storagePrefix;
  }

  set(key, value, fn) {
    try {
      value = JSON.stringify(value);
    }catch(e) {
      throw new Error('json stringify.');
    }
    this.storage.setItem(this.prefix + key, value)
    fn && fn();
  }

  get(key, fn) {
    if (!key) {
      throw new Error('no key.');
    }
    if (typeof key === 'object') {
      throw new Error('key not object.');
    }
    var value = this.storage.getItem(this.prefix + key);
    if (value !== null) {
      try {
        value = JSON.parse(value);
      }catch(e) {
        value = value;
      }
    }
    return value;
  }

  remove(key) {
    this.storage.removeItem(this.prefix + key);
  }
}
export default new Storage();
