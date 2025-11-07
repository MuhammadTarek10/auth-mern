import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashService } from 'src/core/utils/hash.service';
import { TokenService } from 'src/core/utils/token/token.service';
import { UserWithSession } from 'src/core/utils/token/types';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SessionRepository } from './session.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService,
    private readonly config: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) throw new ConflictException('User already exists');

    const hashedPassword = await this.hashService.hash(dto.password);

    const user = await this.usersService.create({
      ...dto,
      authMethod: { provider: 'local', passwordHash: hashedPassword },
    });

    const userId = user._id.toString();

    const refreshToken = await this.tokenService.generateRefreshToken({
      id: userId,
      email: user.email,
    });
    const refreshTokenHash = await this.hashService.hash(refreshToken);
    const accessTokenExpiresIn = this.tokenService.getAccessTokenExpiresIn();

    const session = await this.sessionRepository.create({
      userId: user._id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + accessTokenExpiresIn * 1000),
    });

    const sessionId = session._id.toString();

    const accessToken = await this.tokenService.generateAccessToken({
      id: userId,
      email: user.email,
      sessionId,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: accessTokenExpiresIn,
    };
  }

  async signIn(user: User) {
    const refreshToken = await this.tokenService.generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
    });
    const refreshTokenHash = await this.hashService.hash(refreshToken);
    const accessTokenExpiresIn = this.tokenService.getAccessTokenExpiresIn();

    const session = await this.sessionRepository.create({
      userId: user._id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + accessTokenExpiresIn * 1000),
    });

    const accessToken = await this.tokenService.generateAccessToken({
      id: user._id.toString(),
      email: user.email,
      sessionId: session._id.toString(),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: accessTokenExpiresIn,
    };
  }

  async signOut(user: UserWithSession) {
    const session = await this.sessionRepository.findById(user.sessionId);
    if (!session) throw new UnauthorizedException('Session not found');

    await this.sessionRepository.deleteSession(user.sessionId);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findWithPassword(email);
    if (!user || !user.authMethods[0].passwordHash) return null;

    const isPasswordValid = await this.hashService.verify(
      password,
      user.authMethods[0].passwordHash,
    );
    if (!isPasswordValid) return null;

    return user;
  }
}
