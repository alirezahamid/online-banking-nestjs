import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  fAccId: number;
  @Column()
  fAccNum: number;
  @Column()
  fSortCode: number;

  @Column()
  tAccId: number;
  @Column()
  tAccNum: number;
  @Column()
  tSortCode: number;

  @CreateDateColumn()
  createdDate: Date;
}
