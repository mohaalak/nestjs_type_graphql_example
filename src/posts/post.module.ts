import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { UserModule } from 'src/users/users.module';
import { PostResolver } from './post.resolver';
import { PostDataLoader } from './post.dataloader';

@Module({
  providers: [PostService, PostResolver, PostDataLoader],
  exports: [PostService, PostDataLoader],
})
export class PostModule {}
