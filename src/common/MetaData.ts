import { InterfaceType, Field } from 'nest-type-graphql';

@InterfaceType()
export abstract class MetaData {
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
