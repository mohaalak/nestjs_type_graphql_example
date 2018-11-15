import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { UserModule } from 'src/users/users.module';
import { PostResolver } from './post.resolver';

@Module({
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
