import { IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  'accNum': number;

  @IsNumber()
  'sortCode': number;

  @IsNumber()
  'amount': number;
}
