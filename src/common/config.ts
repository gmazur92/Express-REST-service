// export default () => ({
//   PORT: process.env.PORT,
//   NODE_ENV: process.env.NODE_ENV,
//   POSTGRES_PORT: process.env.POSTGRES_PORT,
//   POSTGRES_USER: process.env.POSTGRES_USER,
//   POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
//   POSTGRES_DB: process.env.POSTGRES_DB,
//   POSTGRES_HOST: process.env.POSTGRES_HOST,
//   JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
// });

import { User } from '../components/users/entities/user.entity';
import { Board } from '../components/boards/entities/board.entity';
import { Task } from '../components/tasks/entities/task.entity';
import { Column } from '../components/boards/entities/column.entity';

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
    synchronize: true,
    logging: false,
    migrations: ['src/migration/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
  },
});
