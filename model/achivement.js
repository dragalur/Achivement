import mongoose from 'mongoose';
import { EmptyAchive } from './emptyAchivments.js';
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
import { User } from './user.js';

const achive = new Schema(
   {
      achiveId: ObjectId,
      name: { type: String, required: true },
      finishedPoints: { type: Number, required: true },
      currentPoints: {
         type: Number,
         default: 0
      },
      isFinished: {
         type: Boolean,
         default: false
      }
   },
   { _id: false }
);

const achivesSchema = new Schema({
   userId: ObjectId,
   achivement: [achive]
});

achivesSchema.statics.concatAchives = function (achive, layout) {
   const arr = achive.map(i => {
      const obj = layout.find(x => x.id == i.achiveId);
      const newObj = {
         id: obj._id,
         name: obj.name,
         description: obj.description,
         coin: obj.coin,
         finishedPoints: obj.finishedPoints,
         currentPoints: i.currentPoints
      };
      return newObj;
   });
   return arr;
};

achivesSchema.methods = {
   completeAchive: async function (id, name) {
      const user = await User.findOne({ _id: id });
      const achive = await EmptyAchive.findOne({ name });
      user.money += achive.coin;
      await user.save();

      const index = this.achivement.findIndex(i => i.name === name);
      this.achivement[index].isFinished = true;
      await this.save();
   }
};

export const Achives = mongoose.model('achivesOfUser', achivesSchema);
