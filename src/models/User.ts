import { Model } from 'objection';
import bcrypt from 'bcrypt';
import createAvatar from '../utils/createAvatar';
import Role from './Role';
import BaseModel from './BaseModel';

export default class User extends BaseModel {
  static tableName = 'users';

  // atributos
  id!: number;
  identification!: string;
  name!: string;
  lastName!: string;
  picture!: string;
  phone?: string;
  email!: string;
  emailVerificationToken?: string;
  emailVerificationExpires!: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  verified!: boolean;
  enable!: boolean;
  password!: string;
  createdAt?: Date;
  updatedAt?: Date;

  /**
   * Compara las contraseñas
   * @returns boolean
   */
  async comparePassword(pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.password);
  }

  /**
   * Se encripta la contraseña y se crea el avatar antes de insertar un usuario
   */
  async $beforeInsert() {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.picture = createAvatar(this.name, this.lastName);
  }

  /**
   * Se establece la fecha de actualización
   */
  $beforeUpdate() {
    this.createdAt = undefined;
    this.updatedAt = new Date();
  }

  /**
   * Se definen las relaciones
   */
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
