import { CacheProvider, RequestHandler } from '../usecase/types';

export const CacheHandlerDecorator = <TInput, TOutput>(
  handler: RequestHandler<TInput, TOutput>,
  cacheProvider: CacheProvider,
  input: TInput
): RequestHandler<TInput, TOutput> => {
  const decorator = (input: TInput) => {
    let result: TOutput;
    const key = JSON.stringify(input);
    result = cacheProvider.get(key);
    if (result) {
      console.log(`From cache!`);
      return result;
    }

    result = handler.handle(input);
    cacheProvider.set(key, result);

    console.log(`Cached`);
    return result;
  };

  return { handle: decorator };
};
