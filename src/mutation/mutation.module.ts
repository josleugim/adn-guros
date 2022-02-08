import { Module } from '@nestjs/common';
import { MutationService } from './mutation.service';
import { MutationController } from './mutation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MutationSchema, Mutation } from './schemas/mutation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Mutation.name,
        schema: MutationSchema,
      },
    ]),
  ],
  controllers: [MutationController],
  providers: [MutationService],
})
export class MutationModule {}
