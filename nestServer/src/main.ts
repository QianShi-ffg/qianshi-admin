import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './not-found/not-found.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置Swagger
  const options = new DocumentBuilder()
    .setTitle('QianShi')
    .setDescription('QianShi Object API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalFilters(new NotFoundFilter());
  await app.listen(3022);
  console.log('3022服务已启动');
}
bootstrap();
