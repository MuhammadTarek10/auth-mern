import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async findById(id: string) {
    this.logger.debug({ userId: id }, `Looking up user by ID`);
    const user = await this.usersRepository.findById(id);

    if (user) {
      this.logger.debug({ userId: id, email: user.email }, `User found by ID`);
    } else {
      this.logger.debug({ userId: id }, `User not found by ID`);
    }

    return user;
  }

  async findByEmail(email: string) {
    this.logger.debug({ email }, `Looking up user by email`);
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      this.logger.debug(
        { userId: user._id.toString(), email },
        `User found by email`,
      );
    } else {
      this.logger.debug({ email }, `User not found by email`);
    }

    return user;
  }

  async findWithPassword(email: string) {
    this.logger.debug({ email }, `Looking up user with password by email`);
    return await this.usersRepository.findWithPassword(email);
  }

  async create(dto: CreateUserDto) {
    this.logger.info({ email: dto.email, name: dto.name }, `Creating new user`);

    const user = await this.usersRepository.create({
      email: dto.email,
      name: dto.name,
      authMethods: [dto.authMethod],
    });

    this.logger.info(
      { userId: user._id.toString(), email: user.email },
      `User created successfully`,
    );

    return user;
  }
}
