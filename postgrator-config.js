require('dotenv').config();
console.log(process.env.DATABASE_URL);
const config = require('./src/config')

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV === 'test')
    ? config.TEST_DATABASE_URL
    : config.DATABASE_URL,
}