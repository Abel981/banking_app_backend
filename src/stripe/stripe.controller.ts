import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('api/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}
  @Public()
  @Get('customer/:id')
  async retriveCustomerDetails(@Param('id') id: string) {
    return await this.stripeService.retriveCustomer(id);
  }
  @Public()
  @Post('connect-account/:id')
  async connectBankAccount(@Param('id') id: string) {
    console.log(id);
    return await this.stripeService.linkBankAccount(id);
  }

  @Public()
  @Get('transactions/:accountId')
  async retriveTransactions(
    @Param('accountId') accountId: string,
    @Query('starting_after') startingAfter: string,
  ) {
    return await this.stripeService.getAccountTransaction(
      accountId,
      startingAfter,
    );
  }
}
