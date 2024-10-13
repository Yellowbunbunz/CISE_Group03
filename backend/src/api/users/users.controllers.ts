import { Post, Body, Controller, UnauthorizedException} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    async login(@Body() userDto: CreateUserDto): Promise<{token: string}> {
        
        // need to check the user was validated in the service
    
        const userAuthenticated = this.userService.validateUser(userDto);

        if(!userAuthenticated){
            throw new UnauthorizedException("Invalid username or password.");
        }

        return { token: 'placeholder token'};
    }
}