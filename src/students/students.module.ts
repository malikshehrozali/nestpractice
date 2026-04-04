import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { Students } from './students.schema';
import { StudentsSchema } from './students.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Students.name,
        schema: StudentsSchema,
      },
    ]),
  ],
})
export class StudentsModule {}
