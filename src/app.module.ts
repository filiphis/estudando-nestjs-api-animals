import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { AnimalsController } from './animals/animals.controller';
import { AnimalsService } from './animals/animals.service';

@Module({
  imports: [AnimalsModule],
  controllers: [AppController, AnimalsController],
  providers: [AppService, AnimalsService],
})
export class AppModule {}
