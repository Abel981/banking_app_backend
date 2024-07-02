import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @Inject('STRIPE_API_KEY') private readonly apiKey: string,
    private usersService: UsersService,
  ) {
    this.stripe = new Stripe(this.apiKey, {});
  }

  async linkBankAccount(id: string): Promise<string> {
    try {
      const user = await this.usersService.findOne(id);

      const customer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });

      await this.usersService.addStripeCustomerId(user.id, customer.id);

      const session = await this.stripe.financialConnections.sessions.create({
        prefetch: ['balances', 'transactions'],
        account_holder: {
          type: 'customer',
          customer: customer.id,
        },
        permissions: [
          'balances',
          'ownership',
          'payment_method',
          'transactions',
        ],
      });
      return session.client_secret;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async retriveCustomer(
    id: string,
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    try {
      const user = await this.usersService.findOne(id);
      return await this.stripe.customers.retrieve(user.stripeCustomerId);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
