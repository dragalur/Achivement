import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
   // const authHeader = req.headers['authorization'];
   // const token = authHeader && authHeader.split(' ')[1];
   const { token } = req.cookies;
   if (token == null) return res.sendStatus(401);

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
   });
}
