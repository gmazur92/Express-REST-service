import { User } from '../components/users/entities/user.entity';
import { Board } from '../components/boards/entities/board.entity';
import { Task } from '../components/tasks/entities/task.entity';
import { Column } from '../components/boards/entities/column.entity';

import {tablesInit1624125987676} from '../migrations/1624125987676-tablesInit'
import {Admin1624215029004} from '../migrations/1624215029004-admin'

export const config = () => ({
  database: {
    type: 'postgres',
    database: process.env['POSTGRES_DB'],
    host: process.env['POSTGRES_HOST'],
    port: process.env['POSTGRES_PORT'],
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    entities: [User, Board, Task, Column],
    migrationsRun: true,
    synchronize: false,
    logging: false,
    migrations: [tablesInit1624125987676,Admin1624215029004],
    cli: {
      migrationsDir: 'migrations',
    },
  },
});
