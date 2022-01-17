import { IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  type: string;

  @IsNumber()
  totalAmount: number;
}
