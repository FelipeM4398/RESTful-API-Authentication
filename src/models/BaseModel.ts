import { Model, snakeCaseMappers } from 'objection';
import MyError from '../utils/MyError';

export default class BaseModel extends Model {
  static get columnNameMappers() {
    // If your columns are UPPER_SNAKE_CASE you can
    // use snakeCaseMappers({ upperCase: true })
    return snakeCaseMappers();
  }

  static createNotFoundError() {
    return new MyError(
      'ResourceNotFound',
      'No se encontró el recurso especificado.',
      404
    );
  }
}
