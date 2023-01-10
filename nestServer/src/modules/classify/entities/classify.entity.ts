import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ArticleList } from '../../article/entities/article.entity';

@Entity()
export class ClassifyList {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  describe: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @OneToMany((type) => ArticleList, (article_list) => article_list.classifyId)
  article: ArticleList[];
}
