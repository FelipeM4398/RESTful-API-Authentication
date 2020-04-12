// endpoints base
const BASE_URL = 'api';
const API_VERSION = 'v1';
const API_BASE_URL = `/${BASE_URL}/${API_VERSION}`;

// messages base
const isRequired = (campo: string) =>
  `El atributo ${campo} no está presente en el cuerpo de la petición`;
const isInvalid = (campo: string) => `El atributo ${campo} no es válido`;
const userAlreadyExists = (campo: string) =>
  `Ya existe un usuario con el mismo valor para el atributo: ${campo}`;

// endpoints
const endpoints = {
  permissions: `${API_BASE_URL}/permissions`,
  roles: `${API_BASE_URL}/roles`,
  users: `${API_BASE_URL}/users`,
  auth: `${API_BASE_URL}/auth`,
  profile: `${API_BASE_URL}/userinfo`,
};

//messagges
const messages = {
  identificationIsRequired: isRequired('identificación'),
  nameIsRequired: isRequired('nombre'),
  lastNameIsRequired: isRequired('apellido'),
  emailIsRequired: isRequired('email'),
  passwordIsRequired: isRequired('password'),
  emailIsInvalid: isInvalid('email'),
  emailAlreadyExists: userAlreadyExists('email'),
  identificationIsInvalid: isInvalid('identificación'),
  nameIsInvalid: isInvalid('nombre'),
  lastNameIsInvalid: isInvalid('apellido'),
  phoneIsInvalid: isInvalid('phone'),
  identificationAlreadyExists: userAlreadyExists('identificación'),
  jsonInvalid: 'El cuerpo de la petición no es válido',
};

// code errors
const errorCodes = {
  attributeNotPresent: 'AttributeNoPresent',
  attributeInvalid: 'AttributeInvalid',
  alreadyExists: 'AlreadyExists',
  jsonInvalid: 'JsonInvalid',
};

export { endpoints, messages, errorCodes };
