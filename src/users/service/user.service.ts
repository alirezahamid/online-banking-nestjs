import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(
    email: string,
    fullName: string,
    address: string,
    phoneNumber: string,
    password: string,
  ) {
    const user = this.repo.create({
      email,
      fullName,
      address,
      phoneNumber,
      password,
    });

    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }
}
