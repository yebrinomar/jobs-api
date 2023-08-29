import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Logging DELETE request IP', req.ip);
    console.log('Logging DELETE request PATH', req.path);
    console.log('Logging DELETE request HEADERS', req.headers);
    next();
  }
}
