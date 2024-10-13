import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async validateUser(userDto: CreateUserDto): Promise<boolean> {

        const { username, password } = userDto;

        const user = await this.userModel.findOne({ username, password}).exec();
        
        if(user){
            return true;
        }
        return false;
    }
}