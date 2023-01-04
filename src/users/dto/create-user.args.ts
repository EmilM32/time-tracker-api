import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateUserArgs {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;
}
