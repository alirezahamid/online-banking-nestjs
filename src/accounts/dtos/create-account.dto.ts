import { IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  // @IsNumber()
  // accountNumber: number;

  // @IsNumber()
  // sortCode: number;

  @IsString()
  type: string;

  @IsNumber()
  totalAmount: number;
}
