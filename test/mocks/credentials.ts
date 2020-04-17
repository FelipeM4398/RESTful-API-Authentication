const mocks = {
  // credenciales validas
  correctCredentials: {
    email: 'valid@test.com',
    password: 'test123',
  },

  notVerifiedCredentials: {
    email: 'noverified@test.com',
    password: 'test123',
  },

  disabledCredentials: {
    email: 'disabled@test.com',
    password: 'test123',
  },

  incorrectCredentials: {
    email: 'vali@test.com',
    password: 'test',
  },
};

export default mocks;
