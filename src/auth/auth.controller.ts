import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { SignupDTO } from './dtos/signup.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signupDto: SignupDTO) {
    return this.authService.signUp(signupDto);
  }
}
