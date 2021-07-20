import { Achives } from '../model/achivement.js';
import { EmptyAchive } from '../model/emptyAchivments.js';
import { User } from '../model/user.js';
import url from 'url';
import path from 'path';

export async function achiveProgress(req, res) {
   try {
      const achiveLayout = await EmptyAchive.findOne({ name: req.params.nameAchive });
      if (!achiveLayout) {
         res.json({ message: 'Achive is not exist' });
         return;
      }
      const achiveUser = await Achives.findOne({ userId: req.user._id });

      const achiveProgressUser = [].find.call(
         achiveUser.achivement,
         x => x.achiveId == achiveLayout._id.toString()
      );

      const achive = Achives.concatAchives([achiveProgressUser], [achiveLayout])[0];
      res.json(achive);
   } catch (e) {
      console.log(e);
   }
}

export async function allAchives(req, res) {
   console.log('start all achive');
   try {
      const achivesUser = await Achives.findOne({ userId: req.user._id }).select('achivement -_id');
      const achivesLayout = await EmptyAchive.find({});
      const achive = Achives.concatAchives(achivesUser.achivement, achivesLayout);
      res.status(200).json(achive);
   } catch (e) {
      console.log(e);
   }
}
export function showPage(req, res) {
   res.sendFile('user.html', { root: path.join(path.resolve(), './public') });
}
export async function progressAchive(req, res) {
   const { nameAchive } = req.params;
   const userAchives = await Achives.findOne({ userId: req.user._id });
   const achive = userAchives.achivement.find(x => x.name === nameAchive);

   const value = achive.currentPoints + 1;

   if (achive.finishedPoints === value) await userAchives.completeAchive(req.user._id, nameAchive);
   try {
      const test = await Achives.updateOne(
         {
            userId: req.user._id
         },
         { $set: { 'achivement.$[el].currentPoints': value } },
         {
            arrayFilters: [{ 'el.name': nameAchive }],
            new: true
         }
      );
      res.status(200).json(test);
   } catch (e) {
      console.log(e);
   }
}

export async function completeAchive(req, res) {
   try {
      const { userAchives, achive } = req.body;
      const user = await User.findOne({ _id: req.user._id });
      const coin = user.coin + achive.coin;
      console.log(coin);
      user.coin = coin;
      await user.save();
   } catch (e) {
      console.log(e);
   }
}

export async function userData(req, res) {
   try {
      console.log('user data express');
      const user = await User.findOne({ _id: req.user._id });
      await res.json({ name: user.name, coin: user.money });
   } catch (e) {
      console.log(e);
   }
}
