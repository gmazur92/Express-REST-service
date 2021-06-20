import { getConnection, createConnection } from 'typeorm';
import ormconfig from './common/ormconfig';

export const connectDB = async () => {
  let connection = null;
  try {
    connection = await getConnection();
  } catch (error) {
    console.error(error);
  }
  try {
    if (connection && !connection.isConnected) {
      await connection.connect();
      await connection.runMigrations()
    } else {
      await createConnection(ormconfig);
    }
    console.log('DB connected');
  } catch (error) {
    console.log('Unable to connect to DB', error);
    process.exit(1);
  }
};

export default { connectDB };
