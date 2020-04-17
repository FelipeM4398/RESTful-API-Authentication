// constantes
const BASE_URL = 'api';
const API_VERSION = 'v1';
const API_BASE_URL = `/${BASE_URL}/${API_VERSION}`;
export const EMAIL_TOKEN_EXPIRE = 86400;
export const JWT_TOKEN_EXPIRE = 86400;
export const PASSWORD_TOKEN_EXPIRE = 3600;
export const JWT_SECRET = process.env.JWT_SECRET || 'myTestSecret';

// mensajes base
const isRequired = (campo: string) => `El atributo ${campo} es requirido`;
const isInvalid = (campo: string) => `El atributo ${campo} no es válido`;
const userAlreadyExists = (campo: string, value: any) =>
  `Ya existe un usuario con: ${campo}=${value}`;

// endponits
const endpoints = {
  permissions: `${API_BASE_URL}/permissions`,
  roles: `${API_BASE_URL}/roles`,
  users: `${API_BASE_URL}/users`,
  auth: `${API_BASE_URL}/auth`,
  profile: `${API_BASE_URL}/userinfo`,
};

// mensajes
const messages = (param?: any) => {
  return {
    identificationIsRequired: isRequired('identificación'),
    nameIsRequired: isRequired('nombre'),
    lastNameIsRequired: isRequired('apellido'),
    emailIsRequired: isRequired('email'),
    passwordIsRequired: isRequired('password'),
    emailIsInvalid: isInvalid('email'),
    emailAlreadyExists: userAlreadyExists('email', param),
    identificationIsInvalid: isInvalid('identificación'),
    nameIsInvalid: isInvalid('nombre'),
    lastNameIsInvalid: isInvalid('apellido'),
    phoneIsInvalid: isInvalid('phone'),
    identificationAlreadyExists: userAlreadyExists('identificación', param),
    tokenInvalidOrExpired: 'El token no es válido o ha expirado',
    badCredentials: 'El email o la contraseña no son correctos',
    notVerified: 'El email no se ha verificado',
    userDisabled: 'El usuario ha sido bloqueado',
  };
};

// errores de codigo
const errorCodes = {
  attributeNotPresent: 'AttributeNoPresent',
  attributeInvalid: 'AttributeInvalid',
  alreadyExists: 'AlreadyExists',
  tokenInvalid: 'TokenInvalid',
  badCredentials: 'BadCredentials',
  notVerified: 'UserNotVerified',
  userDisabled: 'UserDisabled',
};

export { endpoints, messages, errorCodes };
