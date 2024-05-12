import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterService } from "@/services/register";
import { PrismaUserRepository } from "../repositories/prisma/prisma-users-register";
import { UserAlreadyExists } from "@/services/errors/user-already-exists";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  reply.header("access-control-allow-origin", "*");
  reply.header("access-control-allow-headers", "*");

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password, name } = registerBodySchema.parse(request.body);
  console.log(email);
  try {
    const userRepository = new PrismaUserRepository();
    const registerService = new RegisterService(userRepository);

    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    return err;
  }

  return reply.status(201).send();
}
