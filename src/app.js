import express from 'express';
import dotenv from 'dotenv';
import conn from './database/conn';
import cors from 'cors'
import routes from './routes/router'
import errorHandler from './middleware/errorHandler';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

class App {
  constructor() {
    conn();
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: 'http://localhost:3000', // URL frontend - cors error
        methods: ['GET', 'POST'],
      }
    });

    this.middlewares();
    this.routes();
    this.handleErrors();
    this.setupSocketIO();
  }

  middlewares() {
    const corsOptions = {
      origin: 'http://localhost:3000', // frontUrL - cors error
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    }
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api', routes);
  }

  handleErrors() {
    this.app.use(errorHandler);
  }

  setupSocketIO() {
    this.io.on('connection', (socket) => {
      console.log('New user connected:', socket.id);

      // Listen for messages sent by users
      socket.on('chat message', (msg) => {
        console.log('message received: ' + msg);
        // Emit message to all connected users
        this.io.emit('chat message', msg);
      });

      // Handle disconnections
      socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
      });
    });
  }
  start() {
    const port = process.env.PORT || 3015
    this.server.listen(port, () => {
      console.log();
      console.log(`Listening on ${port}`);
      console.log(`CRTL on http://localhost:${port}`);
    })
  }
}

export default new App();
