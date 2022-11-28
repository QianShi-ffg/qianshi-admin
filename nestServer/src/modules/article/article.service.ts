import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleList } from './entities/article.entity';
import { ClassifyList } from '../classify/entities/classify.entity';
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
  async create(data: ArticleSave) {
    const { title } = data;
    const doc = await this.ArticleListRepository.findOne({ where: { title } });
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
  findAllArticle(query) {
    const { page, pageSize } = query
    return this.ArticleListRepository.createQueryBuilder('article_list')
      .orderBy('id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }

  /**
   * @description: 获取当前页的所有发布的文章
   * @param {*} page 当前页
   * @param {*} pageSize 每页行数
   * @return {*}
   */
  findPublishArticle(query) {
    const { page, pageSize, id } = query
    console.log(id)
    const sql = this.ArticleListRepository.createQueryBuilder('article_list')
    .where('article_list.articleStatus = :articleStatus', { articleStatus: '1' })
    if (id) {
      return sql
      .andWhere('article_list.classifyId = :classifyId', { classifyId: id })
      .orderBy('id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
    } else {
      return sql
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
  countArticle(articleStatus) {
    const sql =  this.ArticleListRepository.createQueryBuilder('article_list')
    .select('COUNT(*) count')
    if (articleStatus === '1') {
      return sql
        .where('article_list.articleStatus = :articleStatus', { articleStatus: articleStatus })
        .getRawOne();
    } else {
      return sql.getRawOne();
    }
  }

  /**
   * @description: 联查当前文章分类的统计数
   * @returns
   */
  async countClassify(articleStatus) {
    const sql = await this.ArticleListRepository.createQueryBuilder('article_list')
    .select(['b.id as id','b.name as name', 'COUNT(b.name) as value'])
    .innerJoin('article_list.classify', 'b')
    if (articleStatus === '1') {
      return sql
        .where('article_list.articleStatus = :articleStatus', { articleStatus: articleStatus })
        .groupBy('b.id')
        .getRawMany();
    } else {
      return sql
        .groupBy('b.id')
        .getRawMany();
    }
  }

  /**
   * @description: 查询选中文章详情
   * @param id 文章id
   * @returns {*}
   */
  findArticleDetail(id: number) {
    return this.ArticleListRepository.findOne({
      where: { id: id },
    });
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
    console.log(data);
    return this.ArticleListRepository.update(ids, { articleStatus: 1 });
  }

  remove(data) {
    const { ids } = data;
    return this.ArticleListRepository.delete(ids);
  }
}
