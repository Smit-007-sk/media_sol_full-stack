import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { WebsiteGenerationModule } from '../website-generation/website-generation.module';

@Module({
  imports: [WebsiteGenerationModule],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
