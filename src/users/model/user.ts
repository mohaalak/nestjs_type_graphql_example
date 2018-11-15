import { ObjectType, Field } from 'nest-type-graphql';
import { Post } from 'src/posts/model/post';
import { MetaData } from 'src/common/MetaData';

@ObjectType({ implements: MetaData })
export class User implements MetaData {
  @Field()
  public id: number;
  @Field()
  public firstName: string;
  @Field()
  public lastName: string;
  @Field()
  public username: string;
  public password: string;
  @Field(type => [Post], { nullable: true })
  public posts?: Post[];

  public createdAt: Date;
  updatedAt: Date;
}
