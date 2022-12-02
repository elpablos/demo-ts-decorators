import { StopWatchHandlerDecorator } from '../core/usecase/stop-watch-decorator';
import { GetUserHandlerImpl } from '../core/usecase/get-user-handler';
import {
  CacheProvider,
  RequestHandler,
  UserFilterModel,
  UserRepository,
  UsersModel,
} from '../core/usecase/types';
import { UserRepositoryImpl } from '../infrastructure/repository/user-repository';
import { CacheHandlerDecorator } from '../core/usecase/cache-handler-decorator';
import { InMemoryCacheProvider } from '../infrastructure/cache/in-memory-cache';

const userRepository: UserRepository = UserRepositoryImpl();
const userGetHandler: RequestHandler<UserFilterModel, UsersModel> =
  GetUserHandlerImpl(userRepository);
const cacheProvider: CacheProvider = InMemoryCacheProvider();
const appDiv: HTMLElement = document.getElementById('app');

const log = (obj: any) => {
  appDiv.innerHTML += `<pre>` + JSON.stringify(obj) + `</pre>`;
};

const callAndLog = async (
  handler: RequestHandler<UserFilterModel, UsersModel>
) => {
  let users: UsersModel;
  users = handler.handle({});
  log(users);
};

export const run = async () => {
  let handler: RequestHandler<UserFilterModel, UsersModel>;
  const filter: UserFilterModel = {};
  // 1)
  handler = userGetHandler;
  await callAndLog(handler);

  // 2) stopwatch
  handler = StopWatchHandlerDecorator(userGetHandler, filter);
  await callAndLog(handler);

  // 3) cache + stopwatch
  handler = CacheHandlerDecorator(userGetHandler, cacheProvider, filter);
  handler = StopWatchHandlerDecorator(handler, filter);
  await callAndLog(handler);

  // 4) cache + stopwatch (from da cache)
  handler = CacheHandlerDecorator(userGetHandler, cacheProvider, filter);
  handler = StopWatchHandlerDecorator(handler, filter);
  await callAndLog(handler);
};
