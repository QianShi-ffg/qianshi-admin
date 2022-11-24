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
    const { page, pageSize } = query;
    const res: any = await this.articleService.findAllArticle(page, pageSize);
    const res1: any = await this.articleService.countArticle();
    console.log(await this.articleService.countClassify(), 666666666);
    return {
      code: 200,
      message: 'success',
      data: res,
      total: Number(res1.count),
    };
  }

  @Get('articleClassifyCount')
  async findArticleCount() {
    const res = await this.articleService.countClassify();
    const res1: any = await this.articleService.countArticle();
    return {
      code: 200,
      message: 'success',
      data: res,
      total: Number(res1.count),
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
