import { RequestHandler } from '../usecase/types';

export const StopWatchHandlerDecorator = <TInput, TOutput>(
  handler: RequestHandler<TInput, TOutput>,
  input: TInput
): RequestHandler<TInput, TOutput> => {
  const decorator = (input: TInput) => {
    const startTime = performance.now();
    const result: TOutput = handler.handle(input);
    const endTime = performance.now();

    console.log(`StopWatchHandlerDecorator: ${endTime - startTime} ms`);
    return result;
  };

  return { handle: decorator };
};
