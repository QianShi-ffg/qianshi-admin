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
    let browser = null;
    try {
      if (!existsSync(join(__dirname, '../../../public/screenshot'))) {
        mkdirSync(join(__dirname, '../../../public/screenshot'));
      }
      browser = await puppeteer.launch({
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
          '--ignore-certificate-errors',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
        ],
      });
      const page = await browser.newPage();
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const rres = await page.goto(item.blogUrl, {
        timeout: 0,
        // waitUntil: 'networkidle2', // networkidle2: 500ms 内有不超过 2 个网络连接时就算成功(还有两个以下的request),就认为导航完成。
      });
      // await page.waitForTimeout(4000);
      // try {
      //   new Promise((resolve, reject) =>
      //     setTimeout(async () => {
      //       await page.screenshot({
      //         quality: 10,
      //         // path: `./public/screenshot/${item.id}.jpeg`, //图片保存路径
      //         path: join(
      //           __dirname,
      //           `../../../public/screenshot/${item.id}.jpeg`,
      //         ), //图片保存路径
      //         type: 'jpeg',
      //         fullPage: false, //边滚动边截图
      //       });
      //       const res = await this.FriendShipRepository.update(item.id, {
      //         screenShot: `/screenshot/${item.id}.jpeg`,
      //       });
      //       // const results = await conn(sql, data);
      //       console.log(res, 'res');
      //       console.log('OK');
      //       resolve(true);
      //     }, 4000),
      //   );
      // } catch (error) {
      //   console.log(error, 'errorerrorerrorerrorerrorerrorerror');
      //   return {
      //     code: 200,
      //     data: {},
      //     message: '截屏失败',
      //   };
      // } finally {
      //   await browser.close();
      // }

      // 使用 Promise 来处理延时和截图
      await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            await page.screenshot({
              quality: 10,
              path: join(
                __dirname,
                `../../../public/screenshot/${item.id}.jpeg`,
              ), //图片保存路径
              type: 'jpeg',
              fullPage: false,
            });
            await page.close();
            const res = await this.FriendShipRepository.update(item.id, {
              screenShot: `/screenshot/${item.id}.jpeg`,
            });
            console.log(res, 'res');
            console.log('OK');
            resolve(true);
          } catch (error) {
            reject(error);
          }
        }, 4000);
      });

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
      return {
        code: 200,
        data: {},
        message: '截屏失败',
      };
    } finally {
      // 确保浏览器实例始终被关闭
      if (browser) {
        await browser.close();
      }
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
