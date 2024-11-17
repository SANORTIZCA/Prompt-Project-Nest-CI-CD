import { Controller, Post, Body, Get, Render, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Renderizar la vista de registro
  @Public()
  @Get('register')
  @Render('register') // Renderiza la vista "register.hbs"
  async showRegister() {
    return {}; // Renderizar la página de registro
  }

  @Public() // Rutas públicas
  @Post('register')
  async register(@Body() body: RegisterAuthDto, @Res() res: Response) {
    await this.authService.register(body.name, body.email, body.password);
    return res.redirect('/auth/login?message=Registro%20exitoso');
  }

  @Public()
  @Get('login')
  @Render('login') // Renderiza la vista "login.hbs"
  async showLogin() {
    return {};
  }
  
  @Public() // Rutas públicas
  @Post('login')
  async login(@Body() body: LoginAuthDto, @Res() res: Response) {
    const token = await this.authService.login(body.email, body.password);
    if (token) {
      res.cookie('Authorization', `Bearer ${token}`, { httpOnly: true });
      return res.redirect('/users');
    } else {
      return res.status(401).send('Credenciales inválidas');
    }
  }
}
