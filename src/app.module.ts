import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MutationModule } from './mutation/mutation.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MutationModule,
    MongooseModule.forRoot('mongodb://localhost/adn_guros'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
