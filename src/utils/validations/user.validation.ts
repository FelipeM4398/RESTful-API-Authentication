import { Request } from 'express';
import MyError from '../customError';
import User from '../../models/User';
import { errorCodes, messages } from '../constants';

// expresiones regulares para validar algunos atributos
const emailRegex: RegExp = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/;
const phoneRegex: RegExp = /^[0-9]{10}$/;
const namesRegex: RegExp = /^[A-Za-z\s\u00f1\u00d1]{2,30}$/;
const identificationRegex: RegExp = /^[0-9]{6,10}$/;

/**
 * Valida los atributos enviados en la petición para iniciar sesión
 * @param req
export function validateBodyForLogin(req: Request) {
  validateEmail(req);
  validatePassword(req);
}
*/

/**
 * Valida los atributos enviados en la petición para crear un usuario
 * @param req
 */
export async function validateBodyForCreate(req: Request) {
  validateIdentification(req);
  validateName(req);
  validateLastName(req);
  validatePhone(req);
  validateEmail(req);
  validatePassword(req);

  // valida que no exista un usuario registrado con la identificación enviada
  if (await identificationExists(req)) {
    throw new MyError(
      errorCodes.alreadyExists,
      messages.identificationAlreadyExists,
      400
    );
  }

  // valida que no exista un usuario registrado con el email enviado
  if (await emailExists(req)) {
    throw new MyError(
      errorCodes.alreadyExists,
      messages.emailAlreadyExists,
      400
    );
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
      messages.identificationIsRequired,
      400
    );
  }

  // valida que el atributo cumpla con las condiciones de la expresión regular
  if (!identificationRegex.test(identification)) {
    throw new MyError(
      errorCodes.attributeInvalid,
      messages.identificationIsInvalid,
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
      messages.nameIsRequired,
      400
    );
  }

  // valida que el atributo cumpla con las condiciones de la expresión regular
  if (!namesRegex.test(name)) {
    throw new MyError(errorCodes.attributeInvalid, messages.nameIsInvalid, 400);
  }
}

/**
 * Valida el atributo apellido
 * @param req
 */
export function validateLastName(req: Request) {
  const lastName = req.body.last_name;

  // valida que el atributo este presente en el cuerpo de la petición
  if (!lastName) {
    throw new MyError(
      errorCodes.attributeNotPresent,
      messages.lastNameIsRequired,
      400
    );
  }

  // valida que el atributo cumpla con las condiciones de la expresión regular
  if (!namesRegex.test(lastName)) {
    throw new MyError(
      errorCodes.attributeInvalid,
      messages.lastNameIsInvalid,
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
      messages.emailIsRequired,
      400
    );
  }

  // valida que el atributo cumpla con las condiciones de la expresión regular
  if (!emailRegex.test(email)) {
    throw new MyError(
      errorCodes.attributeInvalid,
      messages.emailIsInvalid,
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
      messages.passwordIsRequired,
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
      messages.phoneIsInvalid,
      400
    );
  }
}

/**
 * Busca un usuario por identificacion y retorna un booleano
 * @param req
 * @return Promise<boolean>
 */
export async function identificationExists(req: Request): Promise<boolean> {
  const identification = req.body.identification;
  let users: any[] = [];
  users = await User.query().where('identification', identification);
  return users.length > 0;
}

/**
 * Busca un usuario por email y retorna un booleano
 * @param req
 * @return Promise<boolean>
 */
export async function emailExists(req: Request): Promise<boolean> {
  const email = req.body.email;
  let users: any[] = [];
  users = await User.query().where('email', email);
  return users.length > 0;
}