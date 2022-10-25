import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleList } from './entities/article.entity';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleList)
    private ArticleListRepository: Repository<ArticleList>,
  ) {}
  create() {
    return 'This action adds a new user';
  }

  async findAll(query) {
    return await this.ArticleListRepository.createQueryBuilder(
      'article_list',
    ).getMany();
    // return await this.ArticleListRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
