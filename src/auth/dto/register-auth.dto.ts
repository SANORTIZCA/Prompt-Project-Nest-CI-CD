import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail() // Valida que el campo sea un email
  @IsNotEmpty() // Asegura que el campo no esté vacío
  email: string;

  @IsString() // Valida que el campo sea un string
  @IsNotEmpty() // Asegura que el campo no esté vacío
  password: string;
}