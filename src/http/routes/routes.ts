import { app } from "@/app";
import { register } from "../controllers/register";
import { users } from "../controllers/users";
import { FastifyReply } from "fastify";

export async function routes() {
  app.options("/users", (request: any, reply: FastifyReply) => {
    reply.header("access-control-allow-origin", "*");
    reply.header("access-control-allow-headers", "*");
    reply.header("access-control-allow-methods", "POST, GET");

    return reply.status(201).send();
  });

  app.post("/users", register);
  app.get("/users", users);
}
