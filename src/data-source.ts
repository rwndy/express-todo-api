import { DataSource } from 'typeorm';
import { User } from './orm/entities/User';

export const AppDataSource = new DataSource({
  // your TypeORM config here, for example:
  type: "mysql",
  // other options...
  entities: [User],
  // other options...
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });