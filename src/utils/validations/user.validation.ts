import { Request } from 'express';
import MyError from '../errors/MyError';
import User from '../../models/User';
import { errorCodes, messages } from '../constants';

// expresiones regulares para validar algunos atributos
const phoneRegex = RegExp(/^[0-9]{10}$/);
const namesRegex = RegExp(/^[A-Za-z\s\u00f1\u00d1]{2,30}$/);
const identificationRegex = RegExp(/^[0-9]{6,10}$/);
const emailRegex = RegExp(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/);

/**
 * Valida los atributos enviados en la petición para crear un usuario
 * @param req
 */
export async function validateBody(req: Request) {
  validateIdentification(req);
  validateName(req);
  validateLastName(req);
  validatePhone(req);
  validateEmail(req);
  validatePassword(req);
  await identificationExists(req);
  await emailExists(req);
}

/**
 * Valida las credenciales y el usuario
 * @param req
 * @returns Promise<User>
 */
export async function validateCredentials(req: Request): Promise<User> {
  validateEmail(req);
  validatePassword(req);

  const user = await User.query().findOne('email', req.body.email);

  // valida que exista un usuario con el email y que las contraseñas coincidan
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new MyError(
      errorCodes.badCredentials,
      messages().badCredentials,
      400
    );
  }

  validateUser(user);

  return user;
}

/**
 * Valida que el usuario esté verificado y habilitado
 * @param user
 */
export function validateUser(user: User) {
  if (!user.verified) {
    throw new MyError(errorCodes.notVerified, messages().notVerified, 403);
  }

  if (!user.enable) {
    throw new MyError(errorCodes.userDisabled, messages().userDisabled, 403);
  }
}

/**
 * Valida el atributo identifiación
 * @param req
 */
export function validateIdentification(req: Request) {
  const identification = req.body.identification;

  // valida que el atributo este presente en el cuerpo de la petición
  if (!identification) {
    throw new MyError(
      errorCodes.attributeNotPresent,
      messages().identificationIsRequired,
      400
    );
  }

  // valida que el atributo cumpla con las condiciones de la expresión regular
  if (!identificationRegex.test(identification)) {
    throw new MyError(
      errorCodes.attributeInvalid,
      messages().identificationIsInvalid,
      400
    );
  }
}

/**
 * Valida el atributo nombre
 * @param req
 */
export function validateName(req: Request) {
  const name = req.body.name;
  // valida que el atributo este presente en el cuerpo de la petición
  if (!name) {
    throw new MyError(
      errorCodes.attributeNotPresent,
      messages().nameIsRequired,
      400
    );
  }

  // valida que el atributo cumpla con las condiciones de la expresión regular
  if (!namesRegex.test(name)) {
    throw new MyError(
      errorCodes.attributeInvalid,
      messages().nameIsInvalid,
      400
    );
  }
}

/**
 * Valida el atributo apellido
 * @param req
 */
export function validateLastName(req: Request) {
  const lastName = req.body.lastName;

  // valida que el atributo este presente en el cuerpo de la petición
  if (!lastName) {
    throw new MyError(
      errorCodes.attributeNotPresent,
      messages().lastNameIsRequired,
      400
    );
  }

  // valida que el atributo cumpla con las condiciones de la expresión regular
  if (!namesRegex.test(lastName)) {
    throw new MyError(
      errorCodes.attributeInvalid,
      messages().lastNameIsInvalid,
      400
    );
  }
}

/**
 * Valida el atributo email
 * @param req
 */
export function validateEmail(req: Request) {
  const email = req.body.email;

  // valida que el atributo este presente en el cuerpo de la petición
  if (!email) {
    throw new MyError(
      errorCodes.attributeNotPresent,
      messages().emailIsRequired,
      400
    );
  }

  // valida que el atributo cumpla con las condiciones de la expresión regular
  if (!emailRegex.test(email)) {
    throw new MyError(
      errorCodes.attributeInvalid,
      messages().emailIsInvalid,
      400
    );
  }
}

/**
 * Valida el atributo contraseña
 * @param req
 */
export function validatePassword(req: Request) {
  const password = req.body.password;

  // valida que el atributo este presente en el cuerpo de la petición
  if (!password) {
    throw new MyError(
      errorCodes.attributeNotPresent,
      messages().passwordIsRequired,
      400
    );
  }
}

/**
 * Valida el atributo phone
 * @param req
 */
export function validatePhone(req: Request) {
  const phone = req.body.phone;

  // atributo opcional si está presente valida que
  // cumpla con las condiciones de la expresión regular
  if (phone && !phoneRegex.test(phone)) {
    throw new MyError(
      errorCodes.attributeInvalid,
      messages().phoneIsInvalid,
      400
    );
  }
}

/**
 * Valida que la identificación no se encuentre registrada
 * @param req
 */
export async function identificationExists(req: Request) {
  const identification = req.body.identification;
  let users: any[] = [];
  users = await User.query().where('identification', identification);
  if (users.length > 0) {
    throw new MyError(
      errorCodes.alreadyExists,
      messages(identification).identificationAlreadyExists,
      409
    );
  }
}

/**
 * Valida que el email no se encuentre registrado
 * @param req
 */
export async function emailExists(req: Request) {
  const email = req.body.email;
  let users: any[] = [];
  users = await User.query().where('email', email);
  if (users.length > 0) {
    throw new MyError(
      errorCodes.alreadyExists,
      messages(email).emailAlreadyExists,
      409
    );
  }
}
