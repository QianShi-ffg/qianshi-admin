import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/overview')
  overview() {
    return this.appService.overview();
  }

  @Get('/refreshToken')
  refreshToken(): string {
    return this.appService.refreshToken();
  }
}
