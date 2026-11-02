import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await argon2.hash(createUserDto.password);

    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name, 
        email: createUserDto.email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    return newUser;
  }

  async findAllUser(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [users, totalData] = await Promise.all([
      this.prisma.user.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        }
      }),
      this.prisma.user.count(),
    ])

    return {
      data: users,
      meta: {
        totalData: totalData,
        currentPage: page,
        limit: limit,
        totalPage: Math.ceil(totalData / limit)
      }
    };
  }

  async findOneUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email }
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
