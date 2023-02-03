import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { configService } from '../config/config.service';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // PassportModule,
    JwtModule.register({
      secret: configService.getJwtSecret(),
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    TypeOrmModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtService,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
