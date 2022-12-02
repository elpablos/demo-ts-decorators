import { CacheProvider } from '../../core/usecase/types';

const inmem = new Map<string, any>();

export const InMemoryCacheProvider = (): CacheProvider => {
  const setFunct = (key: string, value: any) => {
    inmem.set(key, value);
  };
  const getFunct = (key: string) => {
    return inmem.get(key);
  };
  return {
    set: setFunct,
    get: getFunct,
  };
};
