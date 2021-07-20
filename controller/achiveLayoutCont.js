import { EmptyAchive } from '../model/emptyAchivments.js';

export async function createAchive(req, res) {
   const { name, coin, finishedPoints, description } = req.body;
   const achive = new EmptyAchive({ name, description, coin, finishedPoints });
   try {
      await achive.save();
      res.status(200).json({ mesage: 'Achive is saved' });
   } catch (e) {
      console.log(e);
   }
}

export async function showOneAchive(req, res) {
   try {
      const { nameAchive } = req.params;
      const achive = await EmptyAchive.findOne({ name: nameAchive });
      res.status(200).send(achive);
   } catch (e) {
      console.log(e);
   }
}

export async function showAll(req, res) {
   try {
      const achives = await EmptyAchive.find({});
      res.status(200).send(achives);
   } catch (e) {
      console.log(e);
   }
}
