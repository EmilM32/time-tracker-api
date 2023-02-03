import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/models/user.model';
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

  validate(validationPayload: {
    email: string;
    sub: string;
  }): Promise<User | null> {
    return this.usersService.findOne(validationPayload.email);
  }
}
