import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('DB Connected');
  } catch (error) {
    console.log(`error ${error}`);
  }
}

export default main;
