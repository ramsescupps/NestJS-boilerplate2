import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]>{
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User>{
    return this.userRepository.findOneBy({id});
  }

  create(user: User): Promise<User>{
    return this.userRepository.save(user);
  }

  async update(id: number, user: Partial<User>):Promise<User>{
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<string>{
    await this.userRepository.delete(id);
    return "Record deleted successfully";
  }
}
