import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { configService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    });
  }

  async validate(validationPayload: {
    email: string;
    id: number;
    iat: number;
    exp: number;
  }): Promise<boolean> {
    const { email, exp } = validationPayload;
    const isTokenExpired = Date.now() < exp;

    if (isTokenExpired) return false;

    const user = await this.usersService.findOne(email);
    if (!user?.isActive) return false;

    return true;
  }
}
