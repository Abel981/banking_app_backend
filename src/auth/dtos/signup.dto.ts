import { IsEmail, IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class SignupDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  readonly confirmPassword: string;
}
