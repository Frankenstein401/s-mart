import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Budi Santoso', description: 'Nama lengkap user' })
  @IsString({ message: 'Nama harus berupa teks' })
  name: string;

  @ApiProperty({ example: 'budi@gmail.com', description: 'Email aktif user' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email: string;

  @ApiProperty({ example: 'rahasia123', description: 'Minimal 8 karakter' })
  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  password: string;
}