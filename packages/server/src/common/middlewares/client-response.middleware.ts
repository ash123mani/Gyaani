import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SuccessResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
      if (res.statusCode >= 200 && res.statusCode < 300)
        body = {
          data: { ...body },
          successful: true,
        };
      else body = { data: { ...body }, successful: false };

      return originalJson(body);
    };

    next();
  }
}
