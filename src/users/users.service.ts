import { Injectable } from '@nestjs/common';
import { User } from './model/user';
import { CreateUser } from './dto/user';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  private users: User[] = [
    plainToClass(User, {
      id: 1,
      username: 'mohaalak',
      firstName: 'Mohammad Hadi',
      lastName: 'Aliakbar',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  private nextId = 2;

  public find(): User[] {
    return this.users;
  }

  public findById(id: number) {
    return this.users.find(x => x.id === id);
  }

  public findByUsernameAndPassword(username: string, password: string) {
    return this.users.find(
      x => x.username === username && x.password === password,
    );
  }

  public findByUsername(username: string) {
    return this.users.find(x => x.username === username);
  }
  public create(createUser: CreateUser): User {
    const user = plainToClass(User, {
      ...createUser,
      id: this.nextId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.users.push(user);
    this.nextId++;
    return user;
  }
}
