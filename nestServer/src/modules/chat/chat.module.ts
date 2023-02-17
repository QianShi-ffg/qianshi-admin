import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
