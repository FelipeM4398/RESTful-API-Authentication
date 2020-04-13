import { Model } from 'objection';
import bcrypt from 'bcrypt';
import picture from '../utils/picture';
import Role from './Role';

export default class User extends Model {
  static tableName = 'users';

  password!: string;
  picture!: string;
  name!: string;
  last_name!: string;

  /**
   * Se encripta la contraseña y se crea el avatar antes de insertar un usuario
   */
  async $beforeInsert() {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.picture = picture(this.name, this.last_name);
  }

  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'users.id',
          through: {
            // users_roles is the join table.
            from: 'users_roles.id_user',
            to: 'users_roles.id_role',
          },
          to: 'roles.id',
        },
      },
    };
  }
}
