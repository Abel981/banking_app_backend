import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  readonly email: string;

  @MinLength(8)
  @IsString()
  readonly password: string;
}
