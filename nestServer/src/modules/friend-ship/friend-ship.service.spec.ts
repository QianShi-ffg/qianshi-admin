import { Test, TestingModule } from '@nestjs/testing';
import { FriendShipService } from './friend-ship.service';

describe('FriendShipService', () => {
  let service: FriendShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendShipService],
    }).compile();

    service = module.get<FriendShipService>(FriendShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
