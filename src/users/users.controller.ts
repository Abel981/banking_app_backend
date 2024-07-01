import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/api/users')
export class UsersController {
  @Get('/sign-in')
  signIn(@Req() request: Request): string {
    return 'hey sign in';
  }
}
