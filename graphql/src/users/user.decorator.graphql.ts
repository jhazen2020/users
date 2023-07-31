import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


/**
 * Create user decorator for the graphql resolver to get user meta data from the context
 * witch get's it's data from the auth token.
 * @date 7/31/2023 - 12:51:42 PM
 *
 * @type {*}
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);