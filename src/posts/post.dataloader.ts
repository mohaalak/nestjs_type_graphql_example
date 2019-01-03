import { NestDataLoader } from 'src/common/dataloader.interface';
import DataLoader from 'dataloader';
import { PostService } from './post.service';
import { Post } from './model/post';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostDataLoader implements NestDataLoader {
  constructor(private readonly postService: PostService) {}

  generateDataLoader(): DataLoader<any, any> {
    return new DataLoader<number, Post>(this.postService.findMany);
  }
}
