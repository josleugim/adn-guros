import { Injectable } from '@nestjs/common';
import { CreateMutationDto } from './dto/create-mutation.dto';
import { UpdateMutationDto } from './dto/update-mutation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mutation, MutationDocument } from './schemas/mutation.schema';
import { Model } from 'mongoose';
import { ResponseStatsDto } from './dto/response-stats.dto';

@Injectable()
export class MutationService {
  constructor(
    @InjectModel(Mutation.name) private mutationModel: Model<MutationDocument>,
  ) {}
  create(createMutationDto: CreateMutationDto) {
    const createMutation = new this.mutationModel(createMutationDto);
    return createMutation.save();
  }

  async findAll() {
    const aggregationObj: ResponseStatsDto = {
      count_mutations: 0,
      count_no_mutations: 0,
      ratio: 0,
    };

    let aggregation: any = await this.mutationModel
      .aggregate([
        {
          $group: {
            _id: null,
            count_mutations: {
              $sum: { $cond: ['$hasMutation', 1, 0] },
            },
            count_no_mutations: {
              $sum: { $cond: ['$hasMutation', 0, 1] },
            },
          },
        },
      ])
      .exec();

    aggregation = aggregation.pop();

    if (aggregation && aggregation.count_mutations) {
      aggregationObj.count_mutations = aggregation.count_mutations;
    }

    if (aggregation && aggregation.count_no_mutations) {
      aggregationObj.count_no_mutations = aggregation.count_no_mutations;
    }

    if (
      aggregation &&
      aggregation.count_mutations &&
      aggregation.count_no_mutations
    ) {
      aggregationObj.ratio =
        aggregation.count_mutations / aggregation.count_no_mutations;
    }

    return aggregationObj;
  }

  findOne(id: number) {
    return `This action returns a #${id} mutation`;
  }

  update(id: number, updateMutationDto: UpdateMutationDto) {
    return `This action updates a #${id} mutation`;
  }

  remove(id: number) {
    return `This action removes a #${id} mutation`;
  }

  findByDna(dnaArray: [string]): any {
    return this.mutationModel.findOne({ dna: { $all: dnaArray } });
  }
}
