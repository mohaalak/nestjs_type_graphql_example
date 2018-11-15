import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from 'nest-type-graphql';
import { GqlContext } from './GqlContext';

import { TokenService } from 'src/users/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  canActivate(context: ExecutionContext) {
    const graphqlExecutionContext = GqlExecutionContext.create(context);
    const authToken = graphqlExecutionContext
      .getContext<GqlContext>()
      .req.header('authorization');
    const user = this.tokenService.get(authToken);
    if (user) {
      graphqlExecutionContext.getContext<GqlContext>().user = user;
      return true;
    } else {
      return false;
    }
  }
}
