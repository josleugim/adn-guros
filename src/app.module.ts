import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MutationModule } from './mutation/mutation.module';

@Module({
  imports: [MutationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
