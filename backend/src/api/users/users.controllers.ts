import { Post, Body, Controller } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    return this.userService.login(userDto);
  }
}
