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
import { CreateMutationDto } from './dto/create-mutation.dto';
import { UpdateMutationDto } from './dto/update-mutation.dto';

@Controller('mutation')
export class MutationController {
  constructor(private readonly mutationService: MutationService) {}

  @Post()
  create(@Body() createMutationDto: CreateMutationDto, @Res() response) {
    const mutationExists = this.hasMutation(createMutationDto.dna);

    if (mutationExists.mutation) {
      return response.status(HttpStatus.OK).send();
    }

    if (!mutationExists.mutation) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }
    //return this.mutationService.create(createMutationDto);
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

  hasMutation(s) {
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
          }
        }
      }
    }

    for (let i = 0; i < s.length; i++) {
      const rowToArray = s[i].split('');
      for (let j = 0; j < rowToArray.length; j++) {
        if (s.length + 1 - (i + 1) > 3) {
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
          }
        }
      }
    }

    for (let i = 0; i < s.length; i++) {
      const rowToArray = s[i].split('');
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
          }
        }
      }
    }
  }
}
