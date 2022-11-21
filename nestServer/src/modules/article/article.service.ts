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

  /**
   * @description: 创建一条草稿
   * @returns {*}
   */
  create() {
    return 'This action adds a new user';
  }

  /**
   * @description: 获取当前页的所有文章
   * @param {*} page 当前页
   * @param {*} pageSize 每页行数
   * @return {*}
   */
  async findAllArticle(page, pageSize) {
    const res = await this.ArticleListRepository.createQueryBuilder(
      'article_list',
    )
      .orderBy('id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
    const res1 = await this.ArticleListRepository.createQueryBuilder(
      'article_list',
    )
      .select('COUNT(*) count')
      .getRawOne();
    return {
      code: 200,
      msg: 'success',
      data: res,
      total: Number(res1.count),
    };
  }

  /**
   * @description: 查询选中文章详情
   * @param id 文章id
   * @returns {*}
   */
  async findArticleDetail(id: number) {
    const res: any = await this.ArticleListRepository.findOne({
      where: { id: id },
    });
    console.log(res, 3333);
    return {
      code: 200,
      msg: 'success',
      data: res,
    };
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
