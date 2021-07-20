import express from 'express';
export const routh = express.Router();
import {
   achiveProgress,
   showPage,
   allAchives,
   progressAchive,
   completeAchive,
   userData
} from '../controller/userCont.js';
import { authenticateToken } from '../middleware/token.js';

routh.get('/user/:nameAchive', authenticateToken, achiveProgress);
routh.get('/userAllAchives', authenticateToken, allAchives);

routh.get('/user', authenticateToken, showPage);
routh.get('/userData', authenticateToken, userData);

routh.post('/userProgressAchive/:nameAchive', authenticateToken, progressAchive);
routh.post('/userCompleteAchive', authenticateToken, completeAchive);
