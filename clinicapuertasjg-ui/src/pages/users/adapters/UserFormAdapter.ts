import { CreateUserRequest, PatchUserRequest, UserFormData } from '../../../models/user';

export class UserFormAdapter {
  static updateUser(userId: string, userForm: UserFormData): PatchUserRequest {
    return {
      id: userId,
      username: userForm.email,
      email: userForm.email,
      name: userForm.name,
      roleNames: userForm.roleNames,
      surname: userForm.surname,
    };
  }

  static createUser(userForm: UserFormData): CreateUserRequest {
    return {
      email: userForm.email,
      username: userForm.email,
      roleNames: userForm.roleNames,
      name: userForm.name,
      surname: userForm.surname,
      password: userForm.password!,
    };
  }
}
