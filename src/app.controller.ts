import { Controller, Get, Render } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  @Render('home') // Renderiza la vista "home.hbs"
  root() {
    return {};
  }
}
