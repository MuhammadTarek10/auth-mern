import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session } from 'src/auth/schemas/session.schema';
import { BaseRepository } from 'src/core/database/base.repository';

@Injectable()
export class SessionRepository extends BaseRepository<Session> {
  constructor(
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
  ) {
    super(sessionModel);
  }

  async findByUserId(userId: string): Promise<Session[]> {
    return this.find({ userId: new Types.ObjectId(userId) });
  }

  async findByRefreshToken(refreshTokenHash: string): Promise<Session | null> {
    return this.findOne({ refreshTokenHash });
  }

  async findValidSession(refreshTokenHash: string): Promise<Session | null> {
    return this.findOne({
      refreshTokenHash,
      expiresAt: { $gt: new Date() },
    });
  }

  async deleteExpiredSessions(): Promise<void> {
    return this.deleteMany({
      expiresAt: { $lte: new Date() },
    });
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.delete(sessionId);
  }

  async deleteUserSessions(userId: string): Promise<void> {
    return this.deleteMany({ userId: new Types.ObjectId(userId) });
  }

  async deleteByRefreshToken(refreshTokenHash: string): Promise<void> {
    return this.deleteMany({ refreshTokenHash });
  }

  async countUserSessions(userId: string): Promise<number> {
    return this.count({ userId: new Types.ObjectId(userId) });
  }

  async findValidSessionsByUserId(userId: string): Promise<Session[]> {
    return this.find({
      userId: new Types.ObjectId(userId),
      expiresAt: { $gt: new Date() },
    });
  }
}
