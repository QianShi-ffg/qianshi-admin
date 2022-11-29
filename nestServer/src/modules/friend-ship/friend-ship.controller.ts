import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FriendShipService } from './friend-ship.service';
import { CreateFriendShipDto } from './dto/create-friend-ship.dto';
import { UpdateFriendShipDto } from './dto/update-friend-ship.dto';

@Controller('friendShip')
export class FriendShipController {
  constructor(private readonly friendShipService: FriendShipService) {}

  @Post()
  create(@Body() createFriendShipDto: CreateFriendShipDto) {
    return this.friendShipService.create(createFriendShipDto);
  }

  @Get()
  async findAll() {
    const res = await this.friendShipService.findAll();
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendShipService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFriendShipDto: UpdateFriendShipDto,
  ) {
    return this.friendShipService.update(+id, updateFriendShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendShipService.remove(+id);
  }
}
