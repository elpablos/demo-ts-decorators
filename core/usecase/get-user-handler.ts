import {
  RequestHandler,
  UserFilterModel,
  UserRepository,
  UsersModel,
} from '../usecase/types';

export const GetUserHandlerImpl = (
  repository: UserRepository
): RequestHandler<UserFilterModel, UsersModel> => {
  const handler = (filterModel: UserFilterModel) => {
    const users = repository.getUsers();
    const userModel: UsersModel = {
      users: users,
    };
    return userModel;
  };
  return {
    handle: handler,
  };
};
