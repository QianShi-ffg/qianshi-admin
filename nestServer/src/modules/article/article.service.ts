import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  findOne(username: string): string {
    if (username === 'Kid') {
      return 'Kid is here';
    }
    return 'No one here';
  }
}
