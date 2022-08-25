import { RoleName } from './role';

export interface UserAttributes {
  email: string;
  name?: string;
  surname?: string;
}

export interface User extends UserAttributes {
  id: number;
  username: string;
  roleNames: RoleName[];
  displayName?: string;
}

export interface UserRowProps extends UserAttributes {
  id: number;
  roleNames: RoleName[];
  password: string;
  isNew: boolean;
}

export interface CreateUserRequest extends UserAttributes {
  roleNames: RoleName[];
}
export type PutUserRequest = UserAttributes;
export type UpdateUserRequest = { id: string } & UserAttributes;

export type UsersResponse = User[];
export type UserResponse = User;
