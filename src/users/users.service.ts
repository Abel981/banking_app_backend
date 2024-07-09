import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Transaction, User } from '@prisma/client';
import { PaginatedResult, paginator } from 'src/utils/paginator';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findTransactions({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatedResult<Transaction>> {
    return paginator({})(
      this.prisma.transaction,
      {
        where,
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }

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
  async saveAccount(accountIds: string[], userId: string) {
    // const accountIds = accounts.map((account) => account.accountId);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userWithOutPassword } =
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            accountsId: {
              set: accountIds, // This replaces the current accountIds with the new ones
            },
          },
        });
      return userWithOutPassword;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
