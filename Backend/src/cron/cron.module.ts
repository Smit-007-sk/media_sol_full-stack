import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { WebsiteGenerationModule } from '../website-generation/website-generation.module';

@Module({
  imports: [ScheduleModule.forRoot(), WebsiteGenerationModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
