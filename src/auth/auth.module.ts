import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule, // Import ConfigModule
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for async configuration
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: '60s' },
        global:true
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})

export class AuthModule {}