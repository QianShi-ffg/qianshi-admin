import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { FriendShipService } from '../modules/friend-ship/friend-ship.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly friendShipService: FriendShipService) {}

  @Cron('0 0 2 * * 1-5')
  async screenShot() {
    const res = await this.friendShipService.findAll();
    this.logger.debug('该方法工作日每日运行一次');
    res.map((item) => {
      return this.friendShipService.setScreenShot(item);
    });
  }

  // async setScreenShot(item) {
  //   try {
  //     if (!existsSync(join(__dirname, '../../public/screenshot'))) {
  //       mkdirSync(join(__dirname, '../../public/screenshot'));
  //     }
  //     const browser = await puppeteer.launch({
  //       headless: true,
  //       slowMo: 0,
  //       args: [
  //         '--no-zygote',
  //         '--no-sandbox',
  //         '--disable-gpu',
  //         '--no-first-run',
  //         '--single-process',
  //         '--disable-extensions',
  //         '--disable-xss-auditor',
  //         '--disable-dev-shm-usage',
  //         '--disable-popup-blocking',
  //         '--disable-setuid-sandbox',
  //         '--disable-accelerated-2d-canvas',
  //         '--enable-features=NetworkService',
  //       ],
  //     });
  //     const page = await browser.newPage();
  //     await page.setViewport({
  //       width: 1920,
  //       height: 1080,
  //     });
  //     const rres = await page.goto(item.blogUrl, { timeout: 0 });
  //     console.log(rres, 8555);
  //     await page.waitForTimeout(4000);
  //     await page.screenshot({
  //       quality: 10,
  //       // path: `./public/screenshot/${item.id}.jpeg`, //图片保存路径
  //       path: join(__dirname, `../../public/screenshot/${item.id}.jpeg`), //图片保存路径
  //       type: 'jpeg',
  //       fullPage: false, //边滚动边截图
  //     });
  //     await browser.close();
  //     const res = this.friendShipService.update(item.id, {
  //       screenShot: `/screenshot/${item.id}.jpeg`,
  //     });
  //     // const results = await conn(sql, data);
  //     console.log(res, 'res');
  //     console.log('OK');
  //     // }
  //   } catch (error) {
  //     console.log(error, 'error');
  //   }
  // }
}
