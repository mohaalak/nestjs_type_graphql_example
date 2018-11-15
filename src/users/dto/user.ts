import { InputType, Field } from 'nest-type-graphql';
import { MinLength, MaxLength, IsAlpha, IsAlphanumeric } from 'class-validator';

@InputType()
export class CreateUser {
  @MinLength(3)
  @MaxLength(16)
  @IsAlpha()
  @Field()
  public firstName: string;
  @Field()
  @MinLength(3)
  @MaxLength(30)
  @IsAlpha()
  public lastName: string;
  @Field()
  @MinLength(6)
  @IsAlphanumeric()
  public username: string;
  @Field()
  @MinLength(6)
  public password: string;
}
