import { Injectable, HttpException } from '@nestjs/common';
import { CreateClassifyDto } from './dto/create-classify.dto';
import { UpdateClassifyDto } from './dto/update-classify.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassifyList } from './entities/classify.entity';
@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(ClassifyList)
    private ClassifyRepository: Repository<ClassifyList>,
  ) {}

  async create(createClassifyDto: CreateClassifyDto) {
    const { name } = createClassifyDto;
    const doc = await this.ClassifyRepository.findOne({ where: { name } });
    console.log(doc, 'doc');
    if (doc) {
      throw new HttpException('分类已存在', 401);
    }
    return this.ClassifyRepository.save(createClassifyDto);
  }

  async findAllClassify(query) {
    const { page, pageSize } = query;
    if (!page || !pageSize) {
      return this.ClassifyRepository.createQueryBuilder('classify_list')
        .orderBy('id', 'DESC')
        .getMany();
    } else {
      return this.ClassifyRepository.createQueryBuilder('classify_list')
        .orderBy('id', 'DESC')
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getMany();
    }
  }

  /**
   * @description: 统计文章总数
   * @returns
   */
  countArticle() {
    return this.ClassifyRepository.createQueryBuilder('classify_list')
      .select('COUNT(*) count')
      .getRawOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} classify`;
  }

  update(id: number, updateClassifyDto: UpdateClassifyDto) {
    return `This action updates a #${id} classify`;
  }

  remove(data) {
    const { ids } = data;
    return this.ClassifyRepository.delete(ids);
  }
}
