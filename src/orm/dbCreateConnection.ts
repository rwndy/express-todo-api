import { DataSource } from 'typeorm';
import config from './config/ormconfig';

const dataSource = new DataSource(config);

export const dbCreateConnection = async (): Promise<DataSource | null> => {
  try {
    await dataSource.initialize();
    // Adjusted logging to avoid using the deprecated 'name'. Use a custom identifier or configuration-based identification.
    console.log(`Database connection success. Connection to '${config.database}' database established.`);
    return dataSource;
  } catch (err) {
    console.error(err);
  }
  return null;
};
