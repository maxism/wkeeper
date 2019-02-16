import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
/*
  @Get()
  async home(@Res() response) {
      response.sendFile(path.resolve('./front/index.html'));
  }
  */
}
