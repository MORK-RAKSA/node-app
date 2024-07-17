// src/middlewares/loggerMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { format } from 'date-fns';

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const currentDateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const method = req.method;
  const route = req.originalUrl;
  const user = req.headers['user'] || 'Anonymous'; // Assuming 'user' is passed in headers

  console.log(`[${currentDateTime}] ${user} requested ${method} ${route}`);
  
  next();
};

export default loggerMiddleware;
 