import { Module } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ClassifyController } from './classify.controller';
import { ClassifyList } from './entities/classify.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClassifyList])],
  controllers: [ClassifyController],
  providers: [ClassifyService],
})
export class ClassifyModule {}
