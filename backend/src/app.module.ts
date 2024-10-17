import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './api/articles/articles.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_URI),
    ArticlesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}