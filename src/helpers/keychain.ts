import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrototypeManager } from './prototype';
import { LogUtils } from './log';

const { tryStringify, tryParse } = PrototypeManager.json;

export enum STORAGE_KEYS {
  token = 'token',
  expired = 'expired',
  account = 'account',
  timeZoneId = 'timeZoneId',
}

const setItem = async (key: STORAGE_KEYS, value: any) => {
  return new Promise<void>((resolve, reject) => {
    const json = tryStringify(value);
    AsyncStorage.setItem(key, json, error => {
      if (error) {
        reject(error);
        LogUtils.log(
          `AsyncStorage set-item [${key}] with error: ${tryStringify(error)}`,
        );
      } else {
        resolve();
        LogUtils.log(`AsyncStorage set-item [${key}] successfully: ${json}`);
      }
    });
  });
};

const multiSet = async (keyValuePairs: [string, string][]) => {
  return new Promise<void>((resolve, reject) => {
    AsyncStorage.multiSet(keyValuePairs, error => {
      if (error) {
        reject(error);
        LogUtils.log(
          `AsyncStorage multiSet with error: ${tryStringify(error)}`,
        );
      } else {
        resolve();
        LogUtils.log('AsyncStorage multiSet successfully.');
      }
    });
  });
};

const getItem = (key: STORAGE_KEYS): Promise<any> => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (error, result) => {
      if (error) {
        reject(error);
        LogUtils.log(
          `AsyncStorage get-item [${key}] with error: ${tryStringify(error)}`,
        );
      } else {
        const obj = tryParse(result);
        resolve(obj);
        LogUtils.log(`AsyncStorage get-item [${key}] successfully: ${result}`);
      }
    });
  });
};

const multiGet = async (_keys: Array<STORAGE_KEYS>) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet(_keys, (error, results) => {
      if (error) {
        reject(error);
        LogUtils.log(
          `AsyncStorage multiGet [${_keys?.toString()}] with error: ${tryStringify(
            error,
          )}`,
        );
      } else {
        const _results = results?.map(i => tryParse(i[1]));
        resolve(_results);
        LogUtils.log(
          `AsyncStorage multiGet [${_keys?.toString()}] successfully: ${_results?.toString()}`,
        );
      }
    });
  });
};

const removeItem = (key: STORAGE_KEYS) => {
  return new Promise<void>((resolve, reject) => {
    AsyncStorage.removeItem(key, error => {
      if (error) {
        reject(error);
        LogUtils.log(
          `AsyncStorage removeItem [${key}] with error: ${tryStringify(error)}`,
        );
      } else {
        resolve();
        LogUtils.log(`AsyncStorage removeItem [${key}]} successfully.`);
      }
    });
  });
};

const multiRemove = (_keys: STORAGE_KEYS[]) => {
  return new Promise<void>((resolve, reject) => {
    AsyncStorage.multiRemove(_keys, error => {
      if (error) {
        reject(error);
        LogUtils.log(
          `AsyncStorage multiRemove [${_keys?.toString()}] with error: ${tryStringify(
            error,
          )}`,
        );
      } else {
        resolve();
        LogUtils.log(
          `AsyncStorage multiRemove [${_keys?.toString()}]} successfully.`,
        );
      }
    });
  });
};

const clear = () => {
  return new Promise<void>((resolve, reject) => {
    AsyncStorage.clear(error => {
      if (error) {
        reject(error);
        LogUtils.log(`AsyncStorage clear with error: ${tryStringify(error)}`);
      } else {
        resolve();
        LogUtils.log('AsyncStorage clear successfully.');
      }
    });
  });
};

export const KeychainManager = {
  setItem,
  multiSet,
  getItem,
  multiGet,
  removeItem,
  multiRemove,
  clear,
};
