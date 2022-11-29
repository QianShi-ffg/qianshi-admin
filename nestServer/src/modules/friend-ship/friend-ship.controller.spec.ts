import { Test, TestingModule } from '@nestjs/testing';
import { FriendShipController } from './friend-ship.controller';
import { FriendShipService } from './friend-ship.service';

describe('FriendShipController', () => {
  let controller: FriendShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendShipController],
      providers: [FriendShipService],
    }).compile();

    controller = module.get<FriendShipController>(FriendShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
