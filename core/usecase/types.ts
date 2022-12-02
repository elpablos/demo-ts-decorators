export interface RequestHandler<TInput, TOutput> {
  handle(value: TInput): TOutput;
}

export interface UserRepository {
  getUsers(): UserDto[];
}

export type UsersModel = {
  users: UserModel[];
};

export type UserModel = {
  id: number;
  name: string;
};

export type UserFilterModel = {};

export type UserDto = {
  id: number;
  name: string;
};

export interface CacheProvider {
  set(key: string, value: any);
  get(key: string): any;
}
