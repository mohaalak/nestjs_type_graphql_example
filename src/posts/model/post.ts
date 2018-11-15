import { Field } from 'nest-type-graphql';
import { User } from 'src/users/model/user';
import { ObjectType } from 'type-graphql';
import { MetaData } from 'src/common/MetaData';

@ObjectType({ implements: MetaData })
export class Post implements MetaData {
  @Field()
  public id: number;
  @Field()
  public title: string;
  @Field()
  public body: string;
  @Field(type => User)
  public user?: User;

  public userId: number;

  createdAt: Date;
  updatedAt: Date;
}
