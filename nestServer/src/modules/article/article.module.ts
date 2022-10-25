import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleList } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([ArticleList])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
