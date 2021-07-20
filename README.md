# Achivement system

---

Project have been deployed on heroku.  
[Link](#)

Achivement system have been made on example Farm Game.  
User does simple things and fill achivement progress. When achivement will have been done user get coin.

## Endpoints

-  User  
   `GET /user/:nameAchive` - receive one achivement with progress user by name of achive  
   `GET /userAllAchives` - receive all achivements with progress user  
   `GET /userData` - receive user name and money  
   `POST /userProgressAchive/:nameAchive` - user hove done some active and fill on 1 point achivment progress  
   `POST /userCompleteAchive` - user hove done all achivment progress and receive coin

-  Achivements layot  
   `GET /achive/:nameAchive` - get layout of one achive by name  
   `GET /achiveAll` - get all layout of achivements
-  Auth/Reg  
   `POST /register` - register user  
   `POST /login` - authorization and authentication user
