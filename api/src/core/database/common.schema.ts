import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CommonSchema extends Document {
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
}
