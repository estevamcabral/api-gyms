import { env } from "./env/index";
import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { routes } from "./http/routes/routes";
import { ZodError } from "zod";

export const app = fastify();

export const prisma = new PrismaClient();

app.register(routes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send(error.format);
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    //to do
  }

  return reply.status(500).send({ message: "Internal server error" });
});
