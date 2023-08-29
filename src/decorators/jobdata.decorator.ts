import { createParamDecorator } from '@nestjs/common/decorators';

export const JobData = createParamDecorator((data: string, req) => {
  return data ? req.body && req.body[data] : req.body;
});
