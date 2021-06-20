import { PORT } from './common/config';
import app from './app';
import { connectDB } from './db';

const start = async () => {
  await connectDB();
  app.listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`App is running on http://localhost:${PORT}`),
  );
};
start();
