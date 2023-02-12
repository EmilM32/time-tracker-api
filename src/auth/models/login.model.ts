import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Login response' })
export class LoginResponse {
  @Field(() => String, { description: 'Access token' })
  token: string;
}
