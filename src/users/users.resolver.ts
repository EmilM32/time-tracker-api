import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { generateHash } from './utils';
import { Public } from '../decorators';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, {
    description: 'Get user by email address',
  })
  async user(@Args('email') email: string): Promise<User> {
    try {
      const user = await this.usersService.findOne(email);

      if (!user) throw new NotFoundException();

      return user;
    } catch (error) {
      let message = 'User not found';
      if (error instanceof Error) message = error.message;
      throw new Error(message);
    }
  }

  @Public()
  @Mutation(() => User, {
    description: 'Create new user',
  })
  async createUser(@Args('user') args: NewUserInput): Promise<User> {
    args.password = await generateHash(args.password);
    args.email = args.email.toLowerCase();

    const user = await this.usersService.createUser(args);

    return user;
  }

  @Public()
  @Query(() => [User], {
    description: 'Get all users',
  })
  async allUsers(): Promise<User[]> {
    try {
      const users = await this.usersService.findAll();

      if (!users.length) throw new NotFoundException();

      return users;
    } catch (error) {
      let message = 'Users not found';
      if (error instanceof Error) message = error.message;
      throw new Error(message);
    }
  }
}
