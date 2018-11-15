import { ObjectType, Field } from 'nest-type-graphql';
import { User } from '../model/user';

@ObjectType()
export class Token extends User {
  @Field()
  public accessToken: string;
}
