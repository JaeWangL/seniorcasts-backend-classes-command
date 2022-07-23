import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { DecodedUser } from './identity_interfaces';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): DecodedUser => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { __user } = ctx.switchToHttp().getRequest();
    return __user;
  }
);
