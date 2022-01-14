import { Account } from 'src/accounts/model/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
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
  // @Column()
  // fUserId: number;
  // @Column()
  // fAccHolder: string;

  @Column()
  tAccId: number;
  @Column()
  tAccNum: number;
  @Column()
  tSortCode: number;
  // @Column()
  // tUserId: number;
  // @Column()
  // tAccHolder: string;

  @CreateDateColumn()
  createdDate: Date;
}
