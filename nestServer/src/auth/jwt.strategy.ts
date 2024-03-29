// src/modules/auth/jwt.strategy.ts
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // 使用密钥解析
    } as StrategyOptions);
  }

  //token验证, payload是super中已经解析好的token信息
  async validate(payload: any) {
    console.log(66666667);
    return { userId: payload.userId, username: payload.username };
  }
}
