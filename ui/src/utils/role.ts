import { RoleName } from '../models/role';

const roleNamesResolver: Record<RoleName, string> = {
  ROLE_ADMIN: 'Administrador',
};

export function resolveRoleNamesGetter(roleNames: RoleName[]): string[] {
  console.log('**********************', roleNames);
  const roleNamesResolved = roleNames.map((name) => roleNamesResolver[name]);
  return roleNamesResolved;
}

export function resolveRoleNamesSetter(value: string): RoleName | '' {
  console.log('SETTER');
  if (value === 'Administrador') return 'ROLE_ADMIN';
  return '';
}

export function resolveRoleNamesParser(value: string): RoleName | '' {
  console.log('PARSER');
  if (value === 'Administrador') return 'ROLE_ADMIN';
  return '';
}
