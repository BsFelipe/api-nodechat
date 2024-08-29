import express from 'express';
import dotenv from 'dotenv';
import conn from './database/conn';
import cors from 'cors'
import routes from './routes/router'
import errorHandler from './middleware/errorHandler';

dotenv.config();

class App {
  constructor() {
    conn();
    this.app = express();
    this.middlewares();
    this.routes();
    this.handleErrors();
  }

  middlewares() {
    this.app.use(express.urlencoded( {extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/api', routes);
  }
  handleErrors() {
    this.app.use(errorHandler);
  }

}

export default new App().app;
