import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FriendShipService } from './friend-ship.service';
import { CreateFriendShipDto } from './dto/create-friend-ship.dto';
import { UpdateFriendShipDto } from './dto/update-friend-ship.dto';

@Controller('friendShip')
export class FriendShipController {
  constructor(private readonly friendShipService: FriendShipService) {}

  @Post('saveFriendShip')
  async create(@Body() createFriendShipDto: CreateFriendShipDto) {
    const res = await this.friendShipService.create(createFriendShipDto);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Get()
  async findAll(@Query() query: any) {
    const res = await this.friendShipService.findAll(query);
    const res1: any = await this.friendShipService.countFriendShip();
    return {
      code: 200,
      message: 'success',
      data: res,
      total: Number(res1.count),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendShipService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFriendShipDto: UpdateFriendShipDto,
  ) {
    const res = await this.friendShipService.update(+id, updateFriendShipDto);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  @Delete('delete')
  async remove(@Body() data) {
    const res = await this.friendShipService.remove(data);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }
}
