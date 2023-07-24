import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('.wellknown/pki-validation/251D447FB92B0DBBF9C19305AE177478.txt')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
