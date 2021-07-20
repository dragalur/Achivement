import express from 'express';
export const app = express();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { routh as authRouth } from './routh/authRouth.js';
import { routh as ahiveRouth } from './routh/achiveLayoutRouth.js';
import { routh as userRouth } from './routh/userRouth.js';
import 'dotenv/config';

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
mongoose
   .connect(process.env.URL_MONGOOSE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
   })
   .catch(e => {
      console.log('monggose', e);
   });

app.use(express.static('public'));

app.use('/', authRouth);
app.use('/', ahiveRouth);
app.use('/', userRouth);
