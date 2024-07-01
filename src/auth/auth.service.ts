import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignupDTO } from './dtos/signup.dto';
import { SignInDTO } from './dtos/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //   async signIn(
  //     username: string,
  //     pass: string,
  //   ): Promise<{ access_token: string }> {
  //     const user = await this.usersService.findOne(username);
  //     if (user?.password !== pass) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { sub: user.userId, username: user.username };
  //     return {
  //       access_token: await this.jwtService.signAsync(payload),
  //     };
  //   }
  saltOrRounds: number = 10;
  async signIn(signInDto: SignInDTO): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(signInDto.email);
    if (!user) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(signInDto.password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException();
    const payload = {
      sub: user.id,
      email: user.email,
      userName: `${user.firstName} ${user.lastName}`,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp({password, confirmPassword, ...payload}: SignupDTO): Promise<{ id: number }> {
    const user = await this.usersService.findOne(payload.email);
    if (user) throw new ConflictException();
    const hashedPassword = await bcrypt.hash(
      password,
      this.saltOrRounds,
    );

    let data = {
      ...payload,
      passwordHash: hashedPassword,
    };

    const createdUser = await this.usersService.createUser(data);

    return {
      id: createdUser.id
    };
  }
}
