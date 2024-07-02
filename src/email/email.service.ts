import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from 'src/interface/event-types.interface';

// interface Email {
//   to: string;
//   data: any;
// }
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  @OnEvent('user.register')
  async welcomeEmail(data) {
    const { email, name } = data;

    const subject = `Welcome to Company: ${name}`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './welcome',
      context: {
        name,
      },
    });
  }
  @OnEvent('user.low-wants-balance')
  async lowWantsBalance(data: EventPayloads['user.low-wants-balance']) {
    const { email, name, balance } = data;
    const subject = 'low balance notification';

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './low-wants-balance',
      context: {
        name,
      },
    });
  }
}
