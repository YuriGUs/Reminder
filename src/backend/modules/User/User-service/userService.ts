import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { UserResponse, UserData } from "../../../interfaces/UserInterface";

const prisma = new PrismaClient();

// possivelmente passa isso para o front
const userSchema = z.object({
  email: z.string().email({ message: "E-mail obrigatório." }),
  password: z
    .string()
    .min(8, { message: "Senha obrigatória. Minimo 8 caracteres" }),
});

export class UserService {
  // metodo para criar um usuario
  public async createUser(
    email: string,
    password: string
  ): Promise<UserResponse> {
    // Analisa os dados do usuário
    const validatedData: UserData = userSchema.parse({ email, password });

    // verifica se o usuário já existe com o email fornecido

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    // se o usuário já existe, retorna um erro
    if (existingUser) {
      throw new Error("Usuário já existe!");
    }

    // se o usuário não existe, criptografa a senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 8);

    // cria um novo usuário no banco de dados

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    // gera um token jwt para o usuário que expira em 1 hora
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return { user, token };
  }

  // metodo para logar um usuario
  public async loginUser(
    email: string,
    password: string
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({ where: { email } });

    // verifica se o usuário existe
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    // verifica se a senha está correta
    const isValidPassword = await bcrypt.compare(password, user.password);

    // se a senha não estiver correta, retorna um erro
    if (!isValidPassword) {
      throw new Error("Senha incorreta!");
    }

    // gera um token jwt para o usuário que expira em 1 hora
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return { user, token };
  }
}
