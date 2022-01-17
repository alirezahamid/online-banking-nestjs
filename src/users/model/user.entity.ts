import { Account } from 'src/accounts/model/account.entity';
import { Transaction } from 'src/transaction/model/transaction.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

/* 
  User model through SQL Database
*/
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @OneToMany(() => Account, (account) => account.user, { eager: true })
  accounts: Account;

  @OneToOne(() => Transaction, (transaction) => transaction.issuer)
  transactions: Transaction[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
