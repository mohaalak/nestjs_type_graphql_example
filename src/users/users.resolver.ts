import {
  Root,
  FieldResolver,
  Resolver,
  Query,
  Mutation,
  Arg,
} from 'nest-type-graphql';
import { User } from './model/user';
import { UserService } from './users.service';
import { CreateUser } from './dto/user';
import { HttpException } from '@nestjs/common';
import { LoginInput } from './dto/loginInput';
import { Token } from './dto/token';
import { TokenService } from './token.service';
import { PostService } from 'src/posts/post.service';
import { Post } from 'src/posts/model/post';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly postService: PostService,
  ) {}
  @Query(returns => [User], { name: 'users' })
  getUsers(): User[] {
    return this.userService.find();
  }

  @Mutation(returns => User)
  register(@Arg('data') createUser: CreateUser): User {
    if (this.userService.findByUsername(createUser.username) !== undefined) {
      throw new HttpException('This username is taken', 400);
    }
    const user = this.userService.create(createUser);
    return user;
  }

  @Mutation(returns => Token)
  login(@Arg('data') loginInput: LoginInput): Token {
    const user = this.userService.findByUsernameAndPassword(
      loginInput.username,
      loginInput.password,
    );
    if (user === undefined) {
      throw new HttpException('username and password is wrong', 401);
    }
    const token = this.tokenService.create(user);
    return token;
  }

  @FieldResolver(returns => [Post])
  posts(@Root() user: User): Post[] {
    return this.postService.findByUserId(user.id);
  }
}
