import { Controller, Get, Body, Headers, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return 'testt 123';
  }

  @Get('request-info')
  getRequestInfo(@Body() body, @Headers() headers, @Request() req) {
    return {
      headers,
      query: req.query,
      body,
    };
  }
}
