import { InputType, Field } from 'nest-type-graphql';

@InputType()
export class PostInput {
  @Field()
  public title: string;
  @Field()
  public body: string;
}
