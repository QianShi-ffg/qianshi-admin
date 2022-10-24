import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class ArticleList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}

