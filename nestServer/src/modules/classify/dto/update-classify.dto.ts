import { PartialType } from '@nestjs/mapped-types';
import { CreateClassifyDto } from './create-classify.dto';

export class UpdateClassifyDto extends PartialType(CreateClassifyDto) {}
