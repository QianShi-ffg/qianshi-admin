import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ClassifyModule } from './modules/classify/classify.module';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FriendShipModule } from './modules/friend-ship/friend-ship.module';
import { ScheduleModule } from '@nestjs/schedule'; // 定时任务
import { TasksModule } from './schedule/tasks.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'root',
        timezone: '+08:00',
        charset: 'utf8mb4',
        // entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
      }),
    }),
    ArticleModule,
    UserModule,
    ClassifyModule,
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TasksModule,
    FriendShipModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
