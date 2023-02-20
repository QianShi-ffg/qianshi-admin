import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class CountToken {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'longtext' })
  access_token: string;

  @Column({ type: 'longtext' })
  refresh_token: string;

  @Column()
  apiKey: string;

  @Column()
  secretKey: string;

  @Column()
  expires_in: number;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updataTime: Date;
}
