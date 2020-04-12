import { Model } from 'objection';
import bcrypt from 'bcrypt';
import picture from '../utils/picture';

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
}
