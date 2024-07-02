import { Controller, Get, Param, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('api/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}
  @Get('customer:id')
  async retriveCustomerDetails(@Param('id') id: string) {
    return await this.stripeService.retriveCustomer(id);
  }

  @Post('connect-account')
  async connectBankAccount(email: string) {
    return await this.stripeService.linkBankAccount(email);
  }
}
