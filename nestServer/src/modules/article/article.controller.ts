import { Controller, Post, Body } from '@nestjs/common';
import { ArticleService } from './article.service'
@Controller()
export class ArticleController {
  // 需要先用构造器实例化，然后才能调用方法
  constructor(private readonly ArticleService: ArticleService) {}

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.ArticleService.findOne(body.username);
  }
}
