import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from 'nest-type-graphql';
import { Reflector, ModuleRef } from '@nestjs/core';
import { NestDataLoader } from './dataloader.interface';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  intercept(context: ExecutionContext, call$: Observable<any>) {
    // we get from reflector if there is requested any dataloader for this handler
    const type = this.reflector.get<Type<NestDataLoader>>(
      'dataloader',
      context.getHandler(),
    );

    if (type) {
      // GqlExecutionContext is available in @nestjs/graphql also nest-type-graphql
      const graphqlExecutionContext = GqlExecutionContext.create(context);
      const ctx = graphqlExecutionContext.getContext();
      // check if we have add this dataloader on context or not and name it the loader class
      if (!ctx[type.name]) {
        /*
        module ref will get the injected data loader {strict: false} is there
        so it search imported modules too
        **/
        ctx[type.name] = this.moduleRef
          .get<NestDataLoader>(type, { strict: false })
          .generateDataLoader();
      }
    }

    return call$;
  }
}
