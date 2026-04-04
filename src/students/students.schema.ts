import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Students & Document;

@Schema({ timestamps: true })
export class Students {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  age!: number;

  @Prop()
  email?: string;
}

export const StudentsSchema = SchemaFactory.createForClass(Students);
