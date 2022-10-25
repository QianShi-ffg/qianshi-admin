import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class ArticleList {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext', nullable: true })
  articleContent: string;

  @Column({ type: 'int' })
  articleStatus: number;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updataTime: Date;

  @Column({ nullable: true })
  tag: string;

  @Column({ type: 'int' })
  classifyId: number;

  @Column({ nullable: true })
  describe: string;

  @Column({ type: 'longtext', nullable: true })
  coverUrl: string;
}
