import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  accountNumber: number;

  @Expose()
  createdDate: Date;

  @Expose()
  updatedDate: Date;
}
