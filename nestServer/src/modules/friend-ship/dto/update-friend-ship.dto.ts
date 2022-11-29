import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendShipDto } from './create-friend-ship.dto';

export class UpdateFriendShipDto extends PartialType(CreateFriendShipDto) {}
