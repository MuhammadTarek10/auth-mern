import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environment } from 'src/core/config/environment';
import { TokenPayload, UserWithSession } from 'src/core/utils/token/types';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow(Environment.JWT_ACCESS_SECRET),
    });
  }

  async validate(payload: TokenPayload): Promise<UserWithSession> {
    const user = await this.usersService.findById(payload.id);
    if (user)
      return { ...user, sessionId: payload.sessionId } as UserWithSession;

    throw new UnauthorizedException(
      'You are not authorized to access this resource',
    );
  }
}
