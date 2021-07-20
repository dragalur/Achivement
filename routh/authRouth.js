import express from 'express';
export const routh = express.Router();
import { register, login, showPage } from '../controller/authCont.js';

routh.post('/register', register);
routh.post('/login', login);
routh.get('/auth', showPage);
routh.get('/', (res, req) => {
   req.redirect('/auth');
});
