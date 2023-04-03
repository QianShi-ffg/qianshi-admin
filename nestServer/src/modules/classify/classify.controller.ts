import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { CreateClassifyDto } from './dto/create-classify.dto';
import { UpdateClassifyDto } from './dto/update-classify.dto';

@Controller('classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Post('saveClassify')
  async create(@Body() createClassifyDto: CreateClassifyDto) {
    console.log(createClassifyDto, 555);
    const res = await this.classifyService.create(createClassifyDto);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Get()
  async findAllClassify(@Query() query: any) {
    const res = await this.classifyService.findAllClassify(query);
    const res1: any = await this.classifyService.countArticle();
    return {
      code: 200,
      message: 'success',
      data: res,
      total: Number(res1.count),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classifyService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassifyDto: UpdateClassifyDto,
  ) {
    const res = await this.classifyService.update(+id, updateClassifyDto);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Delete('delete')
  async remove(@Body() data) {
    const res = await this.classifyService.remove(data);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }
}
