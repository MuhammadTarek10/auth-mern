import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: string) {
    return await this.usersRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async findWithPassword(email: string) {
    return await this.usersRepository.findWithPassword(email);
  }

  async create(dto: CreateUserDto) {
    return await this.usersRepository.create({
      email: dto.email,
      name: dto.name,
      authMethods: [dto.authMethod],
    });
  }
}
