import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Environment } from 'src/core/config/environment';
import { TokenPayload, TokenResponse } from './types';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async generateToken(payload: TokenPayload): Promise<TokenResponse> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow(Environment.JWT_ACCESS_SECRET),
        expiresIn: this.config.getOrThrow(Environment.JWT_ACCESS_EXPIRES_IN),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow(Environment.JWT_REFRESH_SECRET),
        expiresIn: this.config.getOrThrow(Environment.JWT_REFRESH_EXPIRES_IN),
      }),
    ]);
    return {
      access_token,
      refresh_token,
      expires_in: this.config.getOrThrow(Environment.JWT_ACCESS_EXPIRES_IN),
    };
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.getOrThrow(Environment.JWT_ACCESS_SECRET),
    });
  }

  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.getOrThrow(Environment.JWT_REFRESH_SECRET),
    });
  }
}
