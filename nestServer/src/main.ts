import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('article') // 配置全局前缀
  await app.listen(3000);
  console.log('3000服务已启动')
}
bootstrap();