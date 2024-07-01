import { Injectable } from '@nestjs/common';
import { SignupDTO } from 'src/auth/dtos/signup.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async createUser(signupDTO: SignupDTO): Promise<any> {
    return this.users[0];
  }
}
