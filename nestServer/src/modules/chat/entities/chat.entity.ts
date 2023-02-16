import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  key: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
