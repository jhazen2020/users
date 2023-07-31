import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql"


/**
 * The context comes over differently for graphql. Versus what AuthGuard
 * is originally expecting. Transform the gql call to the expected format
 * for the auth decorators.
 * @date 7/31/2023 - 10:50:11 AM
 *
 * @export
 * @class GqlAuthGuard
 * @typedef {GqlAuthGuard}
 * @extends {AuthGuard('jwt')}
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
   
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}