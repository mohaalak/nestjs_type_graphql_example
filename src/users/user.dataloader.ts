import { NestDataLoader } from 'src/common/dataloader.interface';
import { UserService } from './users.service';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { User } from './model/user';

@Injectable()
export class UserLoader implements NestDataLoader {
  constructor(private readonly userService: UserService) {}

  generateDataLoader(): DataLoader<any, any> {
    // it should instantiate a data laoder each time
    return new DataLoader<number, User>(this.userService.findMany);
  }
}
