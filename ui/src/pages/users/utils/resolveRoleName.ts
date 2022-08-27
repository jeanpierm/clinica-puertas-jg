import { RoleName } from '../../../models/role';

const roleNameResolver = {
  ROLE_ADMIN: 'Administrador',
  ROLE_CLIENT: 'Cliente',
};

export function resolveRoleName(name: RoleName): string {
  return roleNameResolver[name] || 'Indefinido';
}
