import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserArgs } from './dto/create-user.args';
import { NotFoundException } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { comparePassword, generateHash } from './utils';

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

  @Mutation(() => User, {
    description: 'Create new user',
  })
  async createUser(@Args('user') args: NewUserInput): Promise<User> {
    args.password = await generateHash(args.password);
    args.email = args.email.toLowerCase();

    const user = await this.usersService.createUser(args);

    return user;
  }

  // @Mutation(() => Boolean, {
  //   description: 'Login user',
  // })
  // async logIn(@Args('user') args: LoginInput): Promise<boolean> {
  //   try {
  //     const user = await this.usersService.findOne(args.email);

  //     if (!user) throw new NotFoundException();

  //     const isPasswordCorrect = await comparePassword(
  //       args.password,
  //       user.password,
  //     );

  //     return isPasswordCorrect;
  //   } catch (error) {
  //     let message = 'Login failed';
  //     if (error instanceof Error) message = error.message;
  //     throw new Error(message);
  //   }
  // }

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
