// import { Request, Response, NextFunction } from 'express';
// import { format } from 'date-fns';

// const errorHandlerMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
//   const currentDateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
//   const { method, originalUrl, headers } = req;
//   const user = headers['user'] || 'Anonymous';

//   console.error(`[${currentDateTime}] Error: ${err.message} - ${user} requested ${method} ${originalUrl}`);
//   console.error(err.stack);

//   const statusCode = err.name === 'ValidationError' ? 400 :
//                      err.name === 'MongoError' && (err as any).code === 11000 ? 409 :
//                      500;

//   res.status(statusCode).json({ error: { message: err.message } });
// };

// export default errorHandlerMiddleware;
