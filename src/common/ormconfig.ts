import { ConnectionOptions } from 'typeorm';
import {UserEntity} from '../entity/User.entity';
import {BoardEntity} from '../entity/Board.entity';
import {TaskEntity} from '../entity/Task.entity';
import {ColumnEntity} from '../entity/Column.entity';
import {  POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } from './config'

export default {
  type: 'postgres',
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  entities: [UserEntity, BoardEntity, TaskEntity, ColumnEntity],
  migrationsRun: true,
  synchronize: false,
  logging: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;
