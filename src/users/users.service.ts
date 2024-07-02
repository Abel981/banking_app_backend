import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
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

  async findOne(id: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { id } });
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async createUser(payload: any): Promise<any> {
    return this.prisma.user.create({ data: { ...payload } });
  }
  async addStripeCustomerId(id: string, customerId: string) {
    return this.prisma.user.update({
      where: { id },
      data: { stripeCustomerId: customerId },
    });
  }
}
