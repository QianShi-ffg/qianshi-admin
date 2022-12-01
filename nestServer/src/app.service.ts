import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dayjs from 'dayjs';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';

let refresh_token =
  '122.a9f21f37883c5c3e38e278b854c7f73e.Y3sFDZZzsfTGU78eGOzZ78Qlssx9_4LJLUkteD5.MiUUrw';
let access_token =
  '121.25dbadd9e606310af661875e3ab870a4.YDlnLz0RRZf_VZ7fx7haz-YDWqcUovLdZc9he7Y.qkaPcA';
let expires_in = '';
const apiKey = 'PLFuZ5UHascuRd9cANO6SrMdP8GhX6lF';
const secretKey = 'rYhbIuz4YWqK3PTNqzpK5xRzGGpNjbp1';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

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
}
