import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
  Render,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto'; // Importa el DTO
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@Public()
  @Get()
  @Render('users') // Renderiza la vista "users.hbs"
  async getAllUsers() {
    const users: User[] = await this.usersService.getUsers(); // Obtener todos los usuarios
    return { users }; // Pasar los usuarios a la vista
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.getUserById(id);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.getUserByEmail(email);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdateData: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, userUpdateData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
