import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MutationService } from './mutation.service';
import { UpdateMutationDto } from './dto/update-mutation.dto';
import { CreateMutationDto } from './dto/create-mutation.dto';

@Controller('mutation')
export class MutationController {
  constructor(private readonly mutationService: MutationService) {}

  @Post()
  async create(@Body() createMutationDto: CreateMutationDto, @Res() response) {
    const dnaEvaluated = await this.mutationService.findByDna(
      createMutationDto.dna,
    );

    if (dnaEvaluated) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    const mutationExists = MutationController.hasMutation(
      createMutationDto.dna,
    );
    createMutationDto.hasMutation = mutationExists.mutation;

    if (mutationExists.mutation) {
      await this.mutationService.create(createMutationDto);
      return response.status(HttpStatus.OK).send();
    }

    if (!mutationExists.mutation) {
      await this.mutationService.create(createMutationDto);
      return response.status(HttpStatus.FORBIDDEN).send();
    }
  }

  @Get()
  findAll() {
    return this.mutationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mutationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMutationDto: UpdateMutationDto,
  ) {
    return this.mutationService.update(+id, updateMutationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mutationService.remove(+id);
  }

  private static hasMutation(s) {
    let verticalMutation, horizontalMutation, oblique1, oblique2;

    for (let i = 0; i < s.length; i++) {
      const rowToArray = s[i].split('');
      const rowLimit = rowToArray.length + 1;
      for (let j = 0; j < rowToArray.length; j++) {
        if (rowLimit - (j + 1) > 3) {
          if (
            rowToArray[j] === rowToArray[j + 1] &&
            rowToArray[j] === rowToArray[j + 2] &&
            rowToArray[j] === rowToArray[j + 3]
          ) {
            return {
              adn: s[i],
              mutation: true,
            };
          } else {
            verticalMutation = false;
          }
        }

        if (s.length + 1 - (i + 1) > 3) {
          if (
            s[i].split('')[j] === s[1].split('')[j] &&
            s[i].split('')[j] === s[2].split('')[j] &&
            s[i].split('')[j] === s[3].split('')[j]
          ) {
            return {
              dna:
                s[i].split('')[j] +
                s[1].split('')[j] +
                s[2].split('')[j] +
                s[3].split('')[j],
              mutation: true,
            };
          } else {
            horizontalMutation = false;
          }

          if (
            s[i].split('')[j] === s[i + 1].split('')[j - 1] &&
            s[i].split('')[j] === s[i + 2].split('')[j - 2] &&
            s[i].split('')[j] === s[i + 3].split('')[j - 3]
          ) {
            return {
              dna:
                s[i].split('')[j] +
                s[i + 1].split('')[j - 1] +
                s[i + 2].split('')[j - 2] +
                s[i + 3].split('')[j - 3],
              mutation: true,
            };
          } else {
            oblique1 = false;
          }
        }
      }

      for (let j = rowToArray.length - 1; j >= 0; j--) {
        if (s.length + 1 - (i + 1) > 3) {
          if (
            s[i].split('')[j] === s[i + 1].split('')[j + 1] &&
            s[i].split('')[j] === s[i + 2].split('')[j + 2] &&
            s[i].split('')[j] === s[i + 3].split('')[j + 3]
          ) {
            return {
              dna:
                s[i].split('')[j] +
                s[i + 1].split('')[j + 1] +
                s[i + 2].split('')[j + 2] +
                s[i + 3].split('')[j + 3],
              mutation: true,
            };
          } else {
            oblique2 = false;
          }
        }
      }
    }

    if (!verticalMutation && !horizontalMutation && !oblique1 && !oblique2) {
      return {
        dna: [],
        mutation: false,
      };
    }
  }
}
