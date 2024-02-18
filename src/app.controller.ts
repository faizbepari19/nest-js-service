import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from './common/response.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ResponseDto {
    // return this.appService.getHello();

    return new ResponseDto({
      statusCode: 200,
      message: 'Example data',
      data: { example: 'value' },
    });
  }
}
