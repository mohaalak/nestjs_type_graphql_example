import { Module } from '@nestjs/common';
import { ApolloMdoule } from './apollo.module';
import { UserModule } from './users/users.module';
import { PostModule } from './posts/post.module';

@Module({
  imports: [ApolloMdoule, UserModule, PostModule],
})
export class AppModule {}
