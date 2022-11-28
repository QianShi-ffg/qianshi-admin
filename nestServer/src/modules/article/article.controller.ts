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
  async create(@Body() data) {
    const res = await this.articleService.create(data);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Get()
  async findAll(@Query() query: any) {
    const res: any = await this.articleService.findAllArticle(query);
    const res1: any = await this.articleService.countArticle('0');
    return {
      code: 200,
      message: 'success',
      data: res,
      total: Number(res1.count),
    };
  }

  @Get('publishArticle')
  async findPublishArticle(@Query() query: any) {
    const res: any = await this.articleService.findPublishArticle(query);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Get('articleClassifyCount')
  async findArticleCount() {
    const res = await this.articleService.countClassify('1');
    const res1: any = await this.articleService.countArticle('1');
    return {
      code: 200,
      message: 'success',
      data: {
        rows: res,
        total: Number(res1.count),
      },
    };
  }

  @Get(':id')
  async findArticleDetail(@Param('id') id: string) {
    console.log(id, 5555);
    const res = await this.articleService.findArticleDetail(+id);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Patch('update')
  async update(@Body() data) {
    const res = await this.articleService.update(data);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Patch('publish')
  async publish(@Body() data) {
    const res = await this.articleService.publish(data);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Delete('delete')
  async remove(@Body() data) {
    const res = await this.articleService.remove(data);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }
}
