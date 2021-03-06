import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Context,
  Parent,
  FieldResolver,
} from 'nest-type-graphql';
import { Post } from './model/post';
import { PostService } from './post.service';
import { UserService } from 'src/users/users.service';
import { PostInput } from './dto/post';
import { User } from 'src/users/model/user';
import {
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/AuthGaurd';
import { AuthenticationError, ForbiddenError, gql } from 'apollo-server-core';
import { Loader } from 'src/common/loader.decorator';
import { UserLoader } from 'src/users/user.dataloader';
import Dataloader from 'dataloader';
@Resolver(type => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query(returns => [Post], { name: 'posts' })
  getPosts(): Post[] {
    return this.postService.find();
  }

  @Query(returns => Post)
  post(@Arg('id') id: number): Post {
    const post = this.postService.findById(id);
    if (post) {
      return post;
    } else {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Post)
  createPost(@Arg('data') postInput: PostInput, @Context('user') user: User) {
    return this.postService.create(postInput, user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Post)
  updatePost(
    @Arg('id') id: number,
    @Arg('data') postInput: PostInput,
    @Context('user') user: User,
  ): Post {
    const post = this.postService.findById(id);
    if (!post) {
      throw new NotFoundException();
    }
    if (post.userId !== user.id) {
      throw new ForbiddenException('This is not your post');
    }
    return this.postService.updatePost(id, postInput);
  }

  @Loader(UserLoader)
  @FieldResolver(returns => User)
  user(
    @Parent() post: Post,
    @Context('UserLoader') userLoader: Dataloader<number, User>,
  ) {
    return userLoader.load(post.userId);
  }
}
