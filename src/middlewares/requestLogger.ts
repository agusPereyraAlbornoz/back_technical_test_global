import { Request, Response, NextFunction } from 'express';
import { requestReceived } from '../const';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const elapsed = Date.now() - start;
    const newRequest = {
      id: requestReceived.length + 1,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      elapsed: elapsed,
      date: new Date()
    }
    requestReceived.push(newRequest)
    console.log(`${req.method} ${req.originalUrl} statusCode: ${res.statusCode} ${elapsed}ms`);
  });

  next();
};

export default requestLogger;
