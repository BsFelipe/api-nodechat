import express from 'express';
import dotenv from 'dotenv';
import conn from './database/conn';
import cors from 'cors'
import routes from './routes/router'

dotenv.config();

class App {
  constructor() {
    conn();
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded( {extended: true }));
    this.app.use(express.json);
    this.app.use(cors());
  }

  routes() {
    this.app.use('/api', routes)
  }

}

export default new App().app;
