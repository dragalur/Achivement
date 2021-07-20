import mongoose from 'mongoose';
const { Schema } = mongoose;
import jwt from 'jsonwebtoken';
import { EmptyAchive } from './emptyAchivments.js';
import { Achives } from './achivement.js';

const userSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, minLength: 6, required: true },
   money: { type: Number, default: 100 }
});

userSchema.methods = {
   createUserAchive: async function () {
      const originalAchiver = await EmptyAchive.find({});

      const achivement = [];
      [].forEach.call(originalAchiver, item => achivement.push(item.parseAchiveForUser()));

      const achive = new Achives({
         userId: this._id,
         achivement
      });

      try {
         await achive.save();
      } catch (e) {
         console.log(e);
      }
   },
   generateAccesToken: function () {
      const obj = { _id: this._id };
      const secret = process.env.JWT_SECRET;
      return jwt.sign(obj, secret, { expiresIn: 60 * 60 });
   }
};

export const User = mongoose.model('user', userSchema);
