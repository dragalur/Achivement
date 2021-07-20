import { User } from '../model/user.js';
import path from 'path';

export async function register(req, res) {
   const { name, email, password } = req.body;
   const user = new User({ name, email, password });
   try {
      await user.save((err, result) => {
         if (err) console.log(err);
         else {
            result.createUserAchive();
         }
      });
      res.status(200).json({ message: 'You have regestered' });
   } catch (e) {
      console.log(e);
   }
}

export async function login(req, res) {
   const { email, password } = req.body;
   //TODO: has password
   const user = await User.findOne({ email });
   if (user) {
      if (user.password === password) {
         const token = user.generateAccesToken();
         res.cookie('token', token);
         res.status(301).redirect('/user');
      } else res.status(403).json({ message: 'Password is incorrect.' });
   } else res.status(403).json({ message: 'Email is not exist' });
}

export function showPage(req, res) {
   res.sendFile('auth.html', { root: path.join(path.resolve(), './public') });
}
