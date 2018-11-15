import { Module, Global } from '@nestjs/common';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { TokenService } from './token.service';
import { PostModule } from 'src/posts/post.module';

@Global()
@Module({
  providers: [UserService, UserResolver, TokenService],
  imports: [PostModule],
  exports: [UserService, TokenService],
})
export class UserModule {}
