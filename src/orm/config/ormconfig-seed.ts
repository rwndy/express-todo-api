import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const configSeed: DataSourceOptions = {
  type: 'mysql', // Changed from 'postgres' to 'mysql'
  name: 'default',
  host: process.env.MYSQL_HOST, // Adjusted for MySQL
  port: Number(process.env.MYSQL_PORT), // Adjusted for MySQL
  username: process.env.MYSQL_USER, // Adjusted for MySQL
  password: process.env.MYSQL_PASSWORD, // Adjusted for MySQL
  database: process.env.MYSQL_DB, // Adjusted for MySQL
  synchronize: false,
  logging: false,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: ['src/orm/subscriber/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
};


export = configSeed;