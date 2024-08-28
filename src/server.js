import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3006
app.listen(port, () => {
  console.log();
  console.log(`Listening on ${port}`);
  console.log(`CRTL on http://localhost:${port}`);
})
