import { Injectable, Headers, Ip, HostParam } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dayjs from 'dayjs';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { FriendShipService } from './modules/friend-ship/friend-ship.service';

let refresh_token =
  '122.96cf4ec991ab3d6e52530f19df577cdb.YCaI0i54yInsn1JXgSMaDv0UWWy_dRuwupAhOdL.at6EFw';
let access_token =
  '121.ec4b7e3fe132c126cdcdc078ef1f7b2e.Y5agxj3HC4I9AbQI5_P0ByY_9SJ_SfZVEhdslaA.5LOitg';
let expires_in = '';
const apiKey = 'PLFuZ5UHascuRd9cANO6SrMdP8GhX6lF';
const secretKey = 'rYhbIuz4YWqK3PTNqzpK5xRzGGpNjbp1';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private readonly friendShipService: FriendShipService,
  ) {}

  overview(): any {
    // this.httpService.get('http://localhost:3000/cats');
    // const params = {
    //   access_token: access_token,
    //   site_id: "18341059",
    //   method: "overview/getTimeTrendRpt",
    //   start_date: "20220701",
    //   end_date: dayjs().format("YYYYMMDD"),
    //   metrics: "pv_count,visitor_count",
    // };
    return this.httpService
      .get('https://openapi.baidu.com/rest/2.0/tongji/report/getData', {
        params: {
          access_token: access_token,
          site_id: '18341059',
          method: 'overview/getTimeTrendRpt',
          start_date: dayjs().subtract(90, 'day').format('YYYYMMDD'),
          end_date: dayjs().format('YYYYMMDD'),
          metrics: 'pv_count,visitor_count',
        },
      })
      .toPromise()
      .then((res) => {
        if (res.data && res.data.error_code === 111) {
          return {
            code: 111,
            data: res.data.result,
            message: 'token过期,正在重新刷新token',
          };
        }
        return {
          code: 200,
          data: res.data.result,
          message: '获取数据成功',
        };
      })
      .catch((err) => {
        if (err.data && err.data.error_code === 110) {
          return {
            code: 110,
            data: [],
            message: 'token过期,正在重新刷新token',
          };
        }
      });
  }

  refreshToken(): any {
    return this.httpService
      .get('http://openapi.baidu.com/oauth/2.0/token', {
        params: {
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
          client_id: apiKey,
          client_secret: secretKey,
        },
      })
      .toPromise()
      .then((result) => {
        refresh_token = result.data.refresh_token;
        access_token = result.data.access_token;
        expires_in = result.data.expires_in;
        return { code: 200, data: result.data, message: '获取数据成功' };
      })
      .catch((err) => {
        console.log(err, 'err');
        return { code: 2001, message: err.data };
      });
  }

  /**
   * 通过访问者ip获取城市信息
   * @param header 请求头相关数据
   * @returns
   */
  city(header) {
    console.log(header['x-forwarded-for']);
    const ip = header['x-forwarded-for'];
    return this.httpService
      .get('https://api.map.baidu.com/location/ip', {
        params: {
          ak: 'Fn2X2OdjdA66GdbaVG4K30OH6owjjH5D',
          ip: ip,
          coor: 'bd09ll',
        },
      })
      .toPromise()
      .then(async (result) => {
        console.log(result.data, 6666666666666666);
        if (result.data.status === 210) {
          return {
            code: 200,
            data: {},
            message: 'IP校验失败',
          };
        } else {
          const address = result.data.address;
          const mapInfo = result.data.content.point;
          const res = await this.weather(mapInfo);
          const data = res.data.result.realtime;
          let skycon = null;
          const obj = {
            CLEAR_DAY: '晴（白天）',
            CLEAR_NIGHT: '晴（夜间）',
            PARTLY_CLOUDY_DAY: '多云（白天）',
            PARTLY_CLOUDY_NIGHT: '多云（夜间）',
            CLOUDY: '阴',
            LIGHT_HAZE: '轻度雾霾',
            MODERATE_HAZE: '中度雾霾',
            HEAVY_HAZE: '重度雾霾',
            LIGHT_RAIN: '小雨',
            MODERATE_RAIN: '中雨',
            HEAVY_RAIN: '大雨',
            STORM_RAIN: '暴雨',
            FOG: '雾',
            LIGHT_SNOW: '小雪',
            MODERATE_SNOW: '中雪',
            HEAVY_SNOW: '大雪',
            STORM_SNOW: '暴雪',
            DUST: '浮尘',
            SAND: '沙尘',
            WIND: '大风',
          };
          Object.entries(obj).forEach((item) => {
            if (item.includes(data.skycon)) {
              skycon = item[1];
            }
          });
          return {
            code: 200,
            data: {
              address,
              temperature: data.temperature,
              skyconCn: skycon,
              skyconEn: data.skycon,
              pm25: data.air_quality.pm25,
            },
            message: '获取数据成功',
          };
        }
      })
      .catch((err) => {
        console.log(err, 'cityErr');
        return { code: 500, data: null, message: err };
      });
  }

  weather(mapInfo) {
    console.log(`${mapInfo.x},${mapInfo.y}`);
    return this.httpService
      .get(
        `https://api.caiyunapp.com/v2.6/WYpeiV7gkcvrcBp0/${mapInfo.x},${mapInfo.y}/realtime`,
      )
      .toPromise()
      .then((result) => {
        return result;
        // return { code: 200, data: result.data, message: '获取数据成功' };
      })
      .catch((err) => {
        console.log(err, 'weatherErr');
        return err;
      });
  }

  /**
   * 上传接口
   * @param file 文件
   * @returns
   */
  async uploadFile(file) {
    // 获取文件的后缀
    const ext = extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    await this.createMkdir();
    const writeStream = createWriteStream(
      join(__dirname, '../public/uploads', filename),
    );
    writeStream.write(file.buffer);
    return {
      mimetype: file.mimetype,
      originalname: file.originalname,
      size: file.size,
      path: `/uploads/${filename}`,
    };
  }

  createMkdir() {
    if (!existsSync(join(__dirname, '../public'))) {
      mkdirSync(join(__dirname, '../public'));
      if (!existsSync(join(__dirname, '../public/uploads'))) {
        mkdirSync(join(__dirname, '../public/uploads'));
      }
    } else {
      if (!existsSync(join(__dirname, '../public/uploads'))) {
        mkdirSync(join(__dirname, '../public/uploads'));
      }
    }
  }

  async refreshScreenShot(data) {
    console.log(data);
    return await this.friendShipService.setScreenShot(data);
  }
}
