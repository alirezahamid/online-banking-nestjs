import { Expose } from 'class-transformer';

/* 
  Data transfer object - (DTO) for validating data through endpoint related to user and authentication.
*/
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
