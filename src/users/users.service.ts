import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de tener un servicio Prisma
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUser(id: number, userUpdateData: UpdateUserDto): Promise<User> {
    const userExists = await this.getUserById(id); // Esto valida si existe el usuario; puedes omitirlo y tomar la misma validación desde aquí.
    return this.prisma.user.update({
      where: { id },
      data: userUpdateData,
    });
  }

  async deleteUser(id: number): Promise<User> {
    const userExists = await this.getUserById(id); // Esta línea ahora lanza una excepción si no existe el usuario
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
