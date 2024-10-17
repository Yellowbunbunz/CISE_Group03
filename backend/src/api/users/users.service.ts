import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService, // adding jwtservice
  ) {}

  // logging in will return a JWT token upon success.
  async login(userDto: CreateUserDto): Promise<{ token: string }> {
    const { username, password } = userDto;

    const user = await this.userModel.findOne({ username }).exec();
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // token time
    const payload = { username: user.username, sub: user._id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // registering just saves a user to the database.
  async register(userDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(userDto);
    return user.save();
  }
}
