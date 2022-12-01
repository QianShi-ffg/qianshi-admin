import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('overview')
  overview() {
    return this.appService.overview();
  }

  @Get('refreshToken')
  refreshToken(): string {
    return this.appService.refreshToken();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log(body, 11);
    console.log(file, 22);
    const res = await this.appService.uploadFile(file);
    console.log(res, 'resres');
    return { code: 200, data: [res] };
  }
}
