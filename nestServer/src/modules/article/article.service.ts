import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleList } from './entities/article.entity';

export interface ArticleSave {
  id: null;
  title: 'sdsa';
  articleContent: '';
  articleStatus: 0;
  classifyId: 3;
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleList)
    private ArticleListRepository: Repository<ArticleList>,
  ) {}

  /**
   * @description: 创建草稿
   * @returns {*}
   */
  create(data: ArticleSave) {
    const { title } = data;
    const doc = this.ArticleListRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return this.ArticleListRepository.save(data);
  }

  /**
   * @description: 获取当前页的所有文章
   * @param {*} page 当前页
   * @param {*} pageSize 每页行数
   * @return {*}
   */
  findAllArticle(page, pageSize) {
    return this.ArticleListRepository.createQueryBuilder('article_list')
      .orderBy('id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }

  countArticle() {
    return this.ArticleListRepository.createQueryBuilder('article_list')
      .select('COUNT(*) count')
      .getRawOne();
  }

  /**
   * @description: 查询选中文章详情
   * @param id 文章id
   * @returns {*}
   */
  findArticleDetail(id: number) {
    const res: any = this.ArticleListRepository.findOne({
      where: { id: id },
    });
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  /**
   * 文章内容更新
   * @param data 文章详情
   * @returns
   */
  update(data) {
    return this.ArticleListRepository.update(data.id, data);
  }

  /**
   * 文章状态更新
   * @param data 文章id
   * @returns
   */
  publish(data) {
    const { ids } = data;
    return this.ArticleListRepository.update(ids, { articleStatus: 1 });
  }

  remove(data) {
    const { ids } = data;
    return this.ArticleListRepository.delete(ids);
  }
}
