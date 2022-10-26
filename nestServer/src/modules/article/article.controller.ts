import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post('saveDraft')
  create() {
    return this.articleService.create();
  }

  @Get('articleList')
  findAll(@Query() query: any) {
    const { page, pageSize } = query;
    return this.articleService.findAllArticle(page, pageSize);
  }

  @Get('articleList/:id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.articleService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
