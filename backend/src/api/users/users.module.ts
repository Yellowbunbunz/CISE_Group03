import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./users.service";
import { UsersController } from "./users.controllers";
import { User, UserSchema } from "./users.schema";

@Module({
    imports:[
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    providers: [UserService],
    controllers: [UsersController],
})

export class UsersModule {}