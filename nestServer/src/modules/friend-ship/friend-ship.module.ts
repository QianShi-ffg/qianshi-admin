import { Module } from '@nestjs/common';
import { FriendShipService } from './friend-ship.service';
import { FriendShipController } from './friend-ship.controller';
import { FriendShip } from './entities/friend-ship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FriendShip])],
  controllers: [FriendShipController],
  providers: [FriendShipService],
  exports: [FriendShipService],
})
export class FriendShipModule {}
