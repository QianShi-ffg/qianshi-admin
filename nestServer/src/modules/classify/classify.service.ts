import { Injectable } from '@nestjs/common';
import { CreateClassifyDto } from './dto/create-classify.dto';
import { UpdateClassifyDto } from './dto/update-classify.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassifyList } from './entities/classify.entity';
@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(ClassifyList)
    private ArticleListRepository: Repository<ClassifyList>,
  ) {}

  create(createClassifyDto: CreateClassifyDto) {
    return 'This action adds a new classify';
  }

  async findAllClassify() {
    const res: any = await this.ArticleListRepository.find({});
    console.log(res);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} classify`;
  }

  update(id: number, updateClassifyDto: UpdateClassifyDto) {
    return `This action updates a #${id} classify`;
  }

  remove(id: number) {
    return `This action removes a #${id} classify`;
  }
}
