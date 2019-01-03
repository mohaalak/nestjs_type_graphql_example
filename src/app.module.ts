import { Module } from '@nestjs/common';
import { ApolloMdoule } from './apollo.module';
import { UserModule } from './users/users.module';
import { PostModule } from './posts/post.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './common/dataloader.interceptor';

@Module({
  imports: [ApolloMdoule, UserModule, PostModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule {}
