import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environment } from 'src/core/config/environment';
import { RefreshTokenPayload } from 'src/core/utils/token/types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow(Environment.JWT_REFRESH_SECRET),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: RefreshTokenPayload): RefreshTokenPayload {
    const refreshToken = req.headers?.authorization?.split(' ')[1];
    if (!refreshToken) throw new UnauthorizedException('Invalid refresh token');

    if (!payload.sessionId) {
      throw new UnauthorizedException('Session ID missing from token');
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
