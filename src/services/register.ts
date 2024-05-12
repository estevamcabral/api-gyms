import { hash } from "bcryptjs";
import { prisma } from "@/app";
import { UsersRepository } from "@/http/repositories/users-repository";
import { UserAlreadyExists } from "./errors/user-already-exists";

interface RegisterServiceTYpe {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterServiceTYpe) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }

    await this.usersRepository.create({ email, name, password_hash });
  }
}
