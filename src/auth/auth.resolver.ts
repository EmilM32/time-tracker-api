import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Public } from '../decorators';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './models/login.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    const { email, password } = input;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const response = await this.authService.login(user);

    return response;
  }
}
