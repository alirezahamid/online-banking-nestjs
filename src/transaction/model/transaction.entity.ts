import { User } from 'src/users/model/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // type: string;

  @Column()
  amount: number;

  @OneToOne(() => User, { eager: true })
  @JoinTable()
  issuer: User;

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
