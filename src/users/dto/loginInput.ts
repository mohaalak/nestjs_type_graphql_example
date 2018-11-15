import { InputType, Field } from 'nest-type-graphql';
import { MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @MinLength(6)
  public username: string;
  @Field()
  @MinLength(6)
  public password: string;
}
