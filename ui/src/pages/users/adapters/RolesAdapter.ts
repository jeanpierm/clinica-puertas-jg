import { Option } from '../../../models/option';
import { Role } from '../../../models/role';
import { resolveRoleName } from '../utils/resolveRoleName';

export class RolesAdapter {
  static option({ name }: Role): Option {
    return { label: resolveRoleName(name), value: name };
  }
}
