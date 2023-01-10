import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FriendShipService } from '../modules/friend-ship/friend-ship.service';
import { FriendShipModule } from '../modules/friend-ship/friend-ship.module';
@Module({
  imports: [FriendShipModule],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
