import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('/transactions')
  getTransactions(@Query() query: any) {
    const { page, perPage } = query;

    return this.userService.findTransactions({
      orderBy: {
        transactionDate: 'desc',
      },
      page,
      perPage,
    });
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Public()
  @Post('/add-accounts/:id')
  addAccounts(
    @Param('id') id: string,
    @Body() addAccountDto: { accountIds: string[] },
  ) {
    console.log(addAccountDto);
    this.userService.saveAccount(addAccountDto.accountIds, id);
  }
}
