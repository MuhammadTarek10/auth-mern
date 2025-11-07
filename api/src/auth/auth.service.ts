import { Injectable } from '@nestjs/common';
import { HashService } from 'src/core/utils/hash.service';
import { TokenService } from 'src/core/utils/token/token.service';
import { UsersService } from 'src/users/users.service';
import { SessionRepository } from './session.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService,
  ) {}
}
