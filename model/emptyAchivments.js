import mongoose from 'mongoose';
const { Schema } = mongoose;

const achive = new Schema({
   name: { type: String, required: true },
   description: { type: String },
   coin: { type: Number, required: true },
   finishedPoints: { type: Number, required: true }
});

achive.methods = {
   parseAchiveForUser: function () {
      const { _id, finishedPoints, name } = this;
      return { achiveId: _id, finishedPoints, name };
   }
};
export const EmptyAchive = mongoose.model('emptyAchivments', achive);
