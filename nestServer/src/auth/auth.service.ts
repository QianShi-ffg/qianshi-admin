import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findOne(name);
    if (user[0] && user[0].password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log(user, 23333333333);
    const payload = { name: user.username, sub: user.userId };
    return {
      code: 200,
      access_token: this.jwtService.sign(payload),
      message: '登录成功',
    };
  }
}
