import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('reqreqreqreqreqreq');
    // const res = this.authService.login(req.user);
    return this.authService.login(req.user);
  }

  // 在需要的地方使用守卫，需要带token才可访问
  @UseGuards(AuthGuard('jwt')) // jwt策略，身份鉴权
  @Get('userInfo')
  getUserInfo(@Request() req) {
    // 通过req获取到被验证后的user，也可以使用装饰器
    return req.user;
  }
}
