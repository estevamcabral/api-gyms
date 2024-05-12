import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "../repositories/prisma/prisma-users-register";

export async function users(request: FastifyRequest, reply: FastifyReply) {
  reply.header("access-control-allow-origin", "*");
  try {
    const usersRepository = new PrismaUserRepository();

    const allUsers = await usersRepository.getAll();
    return allUsers || [];
  } catch (err) {
    return err;
  }
}
