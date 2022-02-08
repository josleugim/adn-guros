import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MutationDocument = Mutation & Document;

@Schema()
export class Mutation {
  @Prop()
  hasMutation: boolean;

  @Prop()
  dna: [string];
}

export const MutationSchema = SchemaFactory.createForClass(Mutation);
