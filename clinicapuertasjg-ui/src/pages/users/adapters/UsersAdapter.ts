import { User, UserRowProps } from '../../../models/user';

export class UsersAdapter {
  static row({ id, name, surname, email, roleNames }: User): UserRowProps {
    return {
      id,
      name,
      surname,
      email,
      roleNames,
      username: email,
    };
  }
}
