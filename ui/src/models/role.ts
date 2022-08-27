export type RoleName = 'ROLE_ADMIN';

export interface RoleAttributes {
  name: RoleName;
}

export interface Role extends RoleAttributes {
  id: number;
}

export type RolesResponse = Role[];
export type RoleResponse = Role[];
