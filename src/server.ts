import { PORT } from './common/config';
import app from './app';
import { dbConnectionInit } from './db';

const start = async () => {
  try {
    await dbConnectionInit();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
  app.listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`App is running on http://localhost:${PORT}`),
  );
};
start();
