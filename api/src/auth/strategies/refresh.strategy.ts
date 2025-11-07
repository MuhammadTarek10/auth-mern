import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environment } from 'src/core/config/environment';
import { RefreshTokenPayload, TokenPayload } from 'src/core/utils/token/types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow(Environment.JWT_REFRESH_SECRET),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: TokenPayload): RefreshTokenPayload {
    const refresh_token = req.headers?.authorization?.split(' ')[1] ?? null;
    if (!refresh_token) throw new UnauthorizedException('Invalid token');

    return { ...payload, refresh_token };
  }
}
