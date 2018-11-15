import { Injectable } from '@nestjs/common';
import { Post } from './model/post';
import { PostInput } from './dto/post';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PostService {
  private posts: Post[] = [
    plainToClass(Post, {
      id: 1,
      title: 'NestJs',
      body: 'NestJs is a great typescript framework',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    plainToClass(Post, {
      id: 2,
      title: 'TypegraphQL',
      body: 'TypegraphQL is a fantastic library to use shema',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
  private nextId = 3;

  public find(): Post[] {
    return this.posts;
  }

  public findById(id: number): Post {
    return this.posts.find(x => x.id === id);
  }

  public create(postInput: PostInput, userId: number) {
    const post = plainToClass(Post, {
      ...postInput,
      id: this.nextId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.nextId++;
    this.posts.push(post);
    return post;
  }

  public findByUserId(id: number) {
    return this.posts.filter(x => x.userId === id);
  }

  public updatePost(id: number, postInput: PostInput): Post {
    const index = this.posts.findIndex(x => x.id === id);
    this.posts[index].body = postInput.body;
    this.posts[index].title = postInput.title;
    this.posts[index].updatedAt = new Date();
    return this.posts[index];
  }
}
