/* eslint-disable no-underscore-dangle  */
import {
  ERROR_CLASS_META_KEY,
  ERROR_FUNCTION_META_KEY,
} from '@infrastructure/errors/error_constants';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class KafkaRequestControllerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const data = context.switchToRpc().getData();
    const cls = this.reflector.get<string>(
      ERROR_CLASS_META_KEY,
      context.getHandler()
    );
    const func = this.reflector.get<string>(
      ERROR_FUNCTION_META_KEY,
      context.getHandler()
    );

    const className = context.getClass().name;
    const methodKey = context.getHandler().name;

    data.__class = cls || className;
    data.__function = func || methodKey;

    return true;
  }
}
