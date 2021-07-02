import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
dotenv.config();

import './database';
import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunosRoutes from './routes/alunosRoutes';
import fotoRoutes from './routes/fotosRoutes';

class App {
  constructor() {
    this.app = express();
    this.middelwares();
    this.routes();
    this._whiteList = ['http://localhost:3000'];
  }

  corsOptions = {
    origin: (origin, callback) => {
      if (this._whiteList.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  middelwares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(this.corsOptions));
    this.app.use(helmet());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/home', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/token', tokenRoutes);
    this.app.use('/alunos', alunosRoutes);
    this.app.use('/fotos', fotoRoutes);
  }
}

export default new App().app;
