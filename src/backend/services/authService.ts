import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthService {
  async registerUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const existingUser: User | null = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        res.status(400).json({ error: "E-mail já está em uso." });
        return;
      }
    } catch (error) {}
  }
}
