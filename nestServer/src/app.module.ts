import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ClassifyModule } from './modules/classify/classify.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'root',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, // 自动链接被 forFeature 注册的实体
      synchronize: true,
    }),
    ArticleModule,
    UserModule,
    ClassifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
