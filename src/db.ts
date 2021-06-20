import { createConnection, Connection } from 'typeorm';
import ormconfig from './common/ormconfig';

export const dbConnectionInit = async (): Promise<Connection> => createConnection(ormconfig);
