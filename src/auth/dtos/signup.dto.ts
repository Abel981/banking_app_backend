import { IsEmail, IsString, MinLength } from 'class-validator';
// import { Match } from 'src/decorators/match.decorator';

export class SignupDTO {
  @IsEmail()
  readonly email: string;
  @MinLength(8)
  @IsString()
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  // @MinLength(8)
  // @IsString()
  // readonly phone: string;

  // @IsString()
  // @Match('password', { message: 'Passwords do not match' })
  // readonly confirmPassword: string;
}
