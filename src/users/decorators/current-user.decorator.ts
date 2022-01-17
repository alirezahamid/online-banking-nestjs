import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/* 
  This decorator helps us to find who make the request.
  Simple way to authorize users in NestJs.
*/
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
