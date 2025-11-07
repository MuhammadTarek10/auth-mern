import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'User signed up successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ResponseMessage('User signed up successfully')
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(LocalGuard)
  @ResponseMessage('User signed in successfully')
  @Post('sign-in')
  async signIn(@GetUser() user: User) {
    return await this.authService.signIn(user);
  }
}
