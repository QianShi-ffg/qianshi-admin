import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Headers,
  Ip,
  HostParam,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('overview')
  overview() {
    return this.appService.overview();
  }

  @Get('refreshToken')
  refreshToken(): any {
    return this.appService.refreshToken();
  }

  @Get('cityWeather')
  cityWeather(@Headers() header) {
    return this.appService.city(header);
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

  @Post('refreshScreenShot')
  async refreshScreenShot(@Body() data: any) {
    const res = await this.appService.refreshScreenShot(data);
    console.log(res);
    return res;
  }
}
