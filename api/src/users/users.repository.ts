import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/database/base.repository';
import { AuthMethod } from '../auth/schemas/auth-methods.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  async findByAuthMethod(authMethod: AuthMethod): Promise<User | null> {
    return this.findOne({ 'authMethods.provider': authMethod.provider });
  }

  async findWithPassword(email: string): Promise<User | null> {
    return await this.userModel
      .findOne({ email })
      .select('+authMethods')
      .exec();
  }
}
