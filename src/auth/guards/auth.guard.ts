import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator'; // Importar la clave del decorador

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Verificar si la ruta es pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Permitir acceso si la ruta es pública
    }

    // Obtener el token JWT del header Authorization o de las cookies
    const authHeader = request.headers.authorization;
    const token =
      authHeader?.split(' ')[1] ||
      request.cookies?.Authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      // Verificar el token
      const user = await this.jwtService.verifyAsync(token);
      request.user = user; // Almacenar la información del usuario en el objeto request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
