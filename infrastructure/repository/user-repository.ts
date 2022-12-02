import { UserDto, UserRepository } from '../../core/usecase/types';

export const UserRepositoryImpl = (): UserRepository => {
  const getUsers = (): UserDto[] => {
    return [
      { id: 1, name: 'Tonda' },
      { id: 2, name: 'Venca' },
    ];
  };

  return {
    getUsers,
  };
};
