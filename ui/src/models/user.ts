import { RoleName } from './role';

export interface UserAttributes {
  username: string;
  email: string;
  name?: string;
  surname?: string;
}

export interface User extends UserAttributes {
  id: number;
  roleNames: RoleName[];
  displayName?: string;
}

export interface UserRowProps extends UserAttributes {
  id: number;
  roleNames: RoleName[];
}

export interface CreateUserRequest extends UserAttributes {
  password: string;
  roleNames: RoleName[];
}

export interface PutUserRequest extends CreateUserRequest {
  id: string;
}

export interface PatchUserRequest extends Partial<CreateUserRequest> {
  id: string;
}

export type UsersResponse = User[];
export type UserResponse = User;

export type UserFormData = {
  name?: string;
  surname?: string;
  email: string;
  password?: string;
  roleNames: RoleName[];
};
