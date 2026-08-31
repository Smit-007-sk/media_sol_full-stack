import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  private readonly startTime = Date.now();

  @Get()
  getHealth() {
    const uptimeInSeconds = (Date.now() - this.startTime) / 1000;
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: `${uptimeInSeconds.toFixed(2)}s`,
      service: 'NestJS Central Backend API',
    };
  }
}
