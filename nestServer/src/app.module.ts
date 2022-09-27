import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleService } from './modules/article/article.service';
import { ArticleController } from './modules/article/article.controller';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [ArticleModule],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
