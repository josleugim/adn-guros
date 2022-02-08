import { Injectable } from '@nestjs/common';
import { CreateMutationDto } from './dto/create-mutation.dto';
import { UpdateMutationDto } from './dto/update-mutation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mutation, MutationDocument } from './schemas/mutation.schema';
import { Model } from 'mongoose';

@Injectable()
export class MutationService {
  constructor(
    @InjectModel(Mutation.name) private mutationModel: Model<MutationDocument>,
  ) {}
  create(createMutationDto: CreateMutationDto) {
    const createMutation = new this.mutationModel(createMutationDto);
    return createMutation.save();
  }

  findAll() {
    return `This action returns all mutation`;
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
