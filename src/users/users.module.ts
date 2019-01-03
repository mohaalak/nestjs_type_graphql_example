import { Module, Global } from '@nestjs/common';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { TokenService } from './token.service';
import { PostModule } from 'src/posts/post.module';
import { UserLoader } from './user.dataloader';

@Global()
@Module({
  providers: [UserService, UserResolver, TokenService, UserLoader],
  imports: [PostModule],
  exports: [UserService, TokenService, UserLoader],
})
export class UserModule {}
