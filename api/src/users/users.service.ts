import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findWithPassword(email);
  }

  async create(dto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create({
      email: dto.email,
      name: dto.name,
      authMethods: [dto.authMethod],
    });
  }
}
