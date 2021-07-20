import express from 'express';
export const routh = express.Router();
import { createAchive, showAll, showOneAchive } from '../controller/achiveLayoutCont.js';

routh.post('/achiveCreate', createAchive);

routh.get('/achive/:nameAchive', showOneAchive);
routh.get('/achiveAll', showAll);
