const mocks = {
  // usuario con los atributos validos
  userValid: {
    identification: 123456,
    name: 'test',
    lastName: 'test',
    phone: '1234567890',
    email: 'valid0@test.com',
    password: 'test',
  },

  // usuario con una identificación ya existente
  identificationExists: {
    identification: 1234567890,
    name: 'test',
    lastName: 'test',
    phone: '1234567890',
    email: 'valid0@test.com',
    password: 'test',
  },

  // usuario sin identificacion
  withoutIdentification: {
    name: 'test',
    lastName: 'test',
    email: 'valid5@test.com',
    password: 'test',
  },

  // usuario sin nombre
  withoutName: {
    identification: '98323801',
    lastName: 'test',
    email: 'valid6@test.com',
    password: 'test',
  },

  // usuario sin apellido
  withoutLastName: {
    identification: '983326781',
    name: 'test',
    email: 'valid7@test.com',
    password: 'test',
  },

  // usuario sin email
  withoutEmail: {
    identification: '983326781',
    name: 'test',
    lastName: 'test',
    password: 'test',
  },

  // usuario sin password
  withoutPassword: {
    identification: '983326781',
    name: 'test',
    lastName: 'test',
    email: 'test@valid.com',
  },

  // usuario con un email ya existente
  emailExists: {
    identification: 234567890,
    name: 'test',
    lastName: 'test',
    phone: '1234567890',
    email: 'test@test.com',
    password: 'test',
  },

  // usuario con el atributo identificación invalido
  identificationInvalid: {
    identification: '123test',
    name: 'test',
    lastName: 'test',
    phone: '1234567890',
    email: 'valid1@test.com',
    password: 'test',
  },

  // usuario con el atributo nombre inválido
  nameInvalid: {
    identification: '1234567',
    name: 'test123',
    lastName: 'test',
    phone: '1234567890',
    email: 'valid2@test.com',
    password: 'test',
  },

  // usuario con el atributo apellido inválido
  lastNameInvalid: {
    identification: '12345678',
    name: 'test',
    lastName: 'test123',
    phone: '1234567890',
    email: 'valid3@test.com',
    password: 'test',
  },

  // usuario con el atributo teléfono inválido
  phoneInvalid: {
    identification: '12345678',
    name: 'test',
    lastName: 'test',
    phone: '1234567test',
    email: 'valid3@test.com',
    password: 'test',
  },

  // usuario con el atributo email inválido
  emailInvalid: {
    identification: '123456789',
    name: 'test',
    lastName: 'test',
    phone: '1234567890',
    email: 'valid4@testcom',
    password: 'test',
  },
};

export default mocks;
