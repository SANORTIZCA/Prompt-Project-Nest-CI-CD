import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Asegúrate de tener el servicio de usuarios
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string): Promise<User> {
    // Verificamos que no exista un usuario con el mismo email
    const existingUser = await this.usersService.getUserByEmail(email); // O usa getUserByEmail

    if (existingUser) {
      throw new UnauthorizedException(
        `User with email ${email} already exists`,
      );
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(
      name,
      email,
      hashedPassword,
    );
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
