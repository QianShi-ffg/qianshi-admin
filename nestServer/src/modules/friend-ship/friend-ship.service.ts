import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFriendShipDto } from './dto/create-friend-ship.dto';
import { UpdateFriendShipDto } from './dto/update-friend-ship.dto';
import { FriendShip } from './entities/friend-ship.entity';

@Injectable()
export class FriendShipService {
  constructor(
    @InjectRepository(FriendShip)
    private FriendShipRepository: Repository<FriendShip>,
  ) {}

  create(createFriendShipDto: CreateFriendShipDto) {
    return 'This action adds a new friendShip';
  }

  findAll() {
    return this.FriendShipRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} friendShip`;
  }

  update(id: number, updateFriendShipDto: UpdateFriendShipDto) {
    return this.FriendShipRepository.update(id, updateFriendShipDto);
  }

  remove(id: number) {
    return `This action removes a #${id} friendShip`;
  }
}
