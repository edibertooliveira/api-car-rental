const dotevnt = require('dotenv');

dotevnt.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.production',
});

module.exports = {
  type: process.env.DB_DEV_DIALECT,
  host: process.env.DB_DEV_HOSTNAME,
  port: process.env.DB_DEV_PORT,
  username: process.env.DB_DEV_USERNAME,
  password: process.env.DB_DEV_PASSWORD,
  database: process.env.DB_DEV_DATABASE,
  synchronize: false,
  logging: true,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATION],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATION_DIR,
  },
};
