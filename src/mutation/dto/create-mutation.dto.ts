import { Optional } from '@nestjs/common';

export class CreateMutationDto {
  dna: [string];

  @Optional()
  hasMutation?: boolean;
}
