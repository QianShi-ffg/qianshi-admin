import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFriendShipDto } from './dto/create-friend-ship.dto';
import { UpdateFriendShipDto } from './dto/update-friend-ship.dto';
import { FriendShip } from './entities/friend-ship.entity';
import puppeteer from 'puppeteer';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
@Injectable()
export class FriendShipService {
  constructor(
    @InjectRepository(FriendShip)
    private FriendShipRepository: Repository<FriendShip>,
  ) {}

  create(createFriendShipDto: CreateFriendShipDto) {
    return this.FriendShipRepository.save(createFriendShipDto);
  }

  findAll(query) {
    const { page, pageSize, sort } = query;
    return this.FriendShipRepository.createQueryBuilder('friend_ship')
      .orderBy('id', sort)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} friendShip`;
  }

  update(id: number, updateFriendShipDto: UpdateFriendShipDto) {
    return this.FriendShipRepository.update(id, updateFriendShipDto);
  }

  remove(data) {
    const { ids } = data;
    return this.FriendShipRepository.delete(ids.split(','));
  }

  async setScreenShot(item) {
    try {
      if (!existsSync(join(__dirname, '../../../public/screenshot'))) {
        mkdirSync(join(__dirname, '../../../public/screenshot'));
      }
      const browser = await puppeteer.launch({
        headless: true,
        slowMo: 0,
        args: [
          '--no-zygote',
          '--no-sandbox',
          '--disable-gpu',
          '--no-first-run',
          '--single-process',
          '--disable-extensions',
          '--disable-xss-auditor',
          '--disable-dev-shm-usage',
          '--disable-popup-blocking',
          '--disable-setuid-sandbox',
          '--disable-accelerated-2d-canvas',
          '--enable-features=NetworkService',
        ],
      });
      const page = await browser.newPage();
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const rres = await page.goto(item.blogUrl, { timeout: 0 });
      await page.waitForTimeout(4000);
      await page.screenshot({
        quality: 10,
        // path: `./public/screenshot/${item.id}.jpeg`, //图片保存路径
        path: join(__dirname, `../../../public/screenshot/${item.id}.jpeg`), //图片保存路径
        type: 'jpeg',
        fullPage: false, //边滚动边截图
      });
      await browser.close();
      const res = await this.FriendShipRepository.update(item.id, {
        screenShot: `/screenshot/${item.id}.jpeg`,
      });
      // const results = await conn(sql, data);
      console.log(res, 'res');
      console.log('OK');
      return {
        code: 200,
        data: {
          path: `/screenshot/${item.id}.jpeg`,
        },
        message: '截屏已完成',
      };
      // }
    } catch (error) {
      console.log(error, 'error');
    }
  }

  /**
   * @description 统计友链总数
   * @returns
   */
  countFriendShip() {
    return this.FriendShipRepository.createQueryBuilder('friend_ship')
      .select('COUNT(*) count')
      .getRawOne();
  }
}
