import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/core/common/dtos/response.dto';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import type {
  RefreshTokenPayload,
  UserWithSession,
} from 'src/core/utils/token/types';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { RefreshGuard } from './guards/refresh.guard';

@ApiTags('Authentication')
@ApiExtraModels(ResponseDto, TokenResponseDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: SignUpDto })
  @ApiCreatedResponse({
    description: 'User signed up successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(TokenResponseDto) },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      allOf: [{ $ref: getSchemaPath(ResponseDto) }],
    },
  })
  @ResponseMessage('User signed up successfully')
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    description: 'User signed in successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(TokenResponseDto) },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      allOf: [{ $ref: getSchemaPath(ResponseDto) }],
    },
  })
  @UseGuards(LocalGuard)
  @ResponseMessage('User signed in successfully')
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@GetUser() user: User) {
    return await this.authService.signIn(user);
  }

  @ApiOperation({ summary: "Refresh a user's token" })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Token refreshed successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(TokenResponseDto) },
          },
        },
      ],
    },
  })
  @UseGuards(RefreshGuard)
  @ResponseMessage('Token refreshed successfully')
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@GetUser() payload: RefreshTokenPayload) {
    return await this.authService.refresh(payload);
  }

  @ApiOperation({ summary: 'Sign out a user' })
  @ApiOkResponse({ description: 'User signed out successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      allOf: [{ $ref: getSchemaPath(ResponseDto) }],
    },
  })
  @ResponseMessage('User signed out successfully')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  async signOut(@GetUser() user: UserWithSession) {
    return await this.authService.signOut(user);
  }
}
