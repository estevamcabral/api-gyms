import { Prisma } from "@prisma/client";
import { prisma } from "@/app";
import { UsersRepository } from "../users-repository";

export class PrismaUserRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async getAll() {
    const users = await prisma.user.findMany();

    return users;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
