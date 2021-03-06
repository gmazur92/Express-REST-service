import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});
const { AUTH_MODE: authMode } = process.env;

export const { PORT } = process.env;
export const { NODE_ENV } = process.env;
export const { POSTGRES_PORT } = process.env;
export const { POSTGRES_USER } = process.env;
export const { POSTGRES_PASSWORD } = process.env;
export const { POSTGRES_DB } = process.env;
export const { POSTGRES_HOST } = process.env;
export const { JWT_SECRET_KEY } = process.env || 'supersecretkey'
export const AUTH_MODE = authMode === 'true';
