import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./users.service";
import { UsersController } from "./users.controllers";
import { User, UserSchema } from "./users.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '1h'},
        }),
    ],
    providers: [UserService],
    controllers: [UsersController],
})

export class UsersModule {}