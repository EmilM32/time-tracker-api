import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ContextType } from './interfaces/context.interface';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('input') input: LoginInput,
    @Context() ctx: ContextType,
  ): Promise<string> {
    const { email, password } = input;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const { token } = await this.authService.login(user);
    // ctx.req.session.userId = user.id;
    return token;
  }
}
