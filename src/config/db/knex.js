const config = require('./knexfile.js')[process.env.NODE_ENV || 'development'];

export default require('knex')(config);
