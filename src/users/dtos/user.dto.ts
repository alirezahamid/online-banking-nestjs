import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  createdDate: Date;

  @Expose()
  updatedDate: Date;
}
