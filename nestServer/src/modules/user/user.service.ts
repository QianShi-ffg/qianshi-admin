import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  /**
   * 注册
   * @param name 账户名
   * @param password 密码
   * @returns 返回当前注册账户信息
   */
  async signUp(name, password) {
    const res: any = await this.UserRepository.find({
      where: { name: name },
    });
    if (res.length === 0) {
      const res1: any = await this.UserRepository.save({
        name: name,
        password: password,
      });
      // const res: any = await this.UserRepository.createQueryBuilder()
      //   .insert()
      //   .into('user')
      //   .values([{ name: name, password: password }])
      //   .execute()
      return { code: 200, data: res1, message: '注册成功' };
    } else {
      return { code: 500, message: '该名称已被注册' };
    }
  }

  /**
   * 登录接口
   * @param name 账户名
   * @param password 密码
   * @returns 返回当前账户基本信息
   */
  async login(name, password) {
    const res: any = await this.UserRepository.find({
      where: { name: name, password: password },
    });
    let msg: any = '';
    let code = 200;
    if (res.length === 0) {
      code = 500;
      msg = '账户密码不正确,请重新输入';
    } else {
      msg = '登录成功';
    }
    return { code: code, message: msg, data: res };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
