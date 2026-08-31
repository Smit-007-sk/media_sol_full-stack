import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    const nodeEnv = configService.get<string>('NODE_ENV', 'development');

    if (!secret && nodeEnv === 'production') {
      throw new Error('JWT_SECRET is required in production environment');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret || 'dev-only-secret-do-not-use-in-production',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.validateActiveUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User account is inactive or no longer exists');
    }
    return this.usersService.sanitizeUser(user);
  }
}
