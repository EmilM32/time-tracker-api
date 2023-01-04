import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserArgs } from './dto/create-user.args';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, {
    description: 'Get user by id',
  })
  async user(@Args('userId') userId: string): Promise<User> {
    try {
      const user = await this.usersService.findOne(userId);

      if (!user) throw new NotFoundException();

      return user;
    } catch (error) {
      let message = 'User not found';
      if (error instanceof Error) message = error.message;
      throw new Error(message);
    }
  }

  @Mutation(() => User, {
    description: 'Create new user',
  })
  async createUser(@Args() args: CreateUserArgs): Promise<User> {
    const user = await this.usersService.createUser(args);

    return user;
  }

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
