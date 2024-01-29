import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReminderController {
  async createReminder(req: Request, res: Response): Promise<void> {
    try {
      // Verificar se o corpo da requisição existe e possui as propriedades necessárias
      if (!req.body || !req.body.title || !req.body.content) {
        res.status(400).json({
          error:
            "Corpo da requisição inválido. Certifique-se de enviar title, content e dueDate.",
        });
        return;
      }

      const { title, content } = req.body;

      const newReminder = await prisma.reminder.create({
        data: { title, content },
      });

      res.json({
        success: true,
        message: "Lembrete criado com sucesso.",
        reminder: newReminder,
      });
    } catch (error) {
      console.error("Erro ao criar lembrete:", error);
      res.status(500).json({ error: "Erro no servidor ao criar lembrete." });
    }
  }

  async listAllReminders(req: Request, res: Response): Promise<any> {
    try {
      const getAllReminders = await prisma.reminder.findMany();
      res.status(200).json({ reminders: getAllReminders });
    } catch (error) {
      console.error("Erro ao buscar lembretes: ", error);
      res.status(500).json({ error: "Erro no servidor ao buscar lembretes." });
    }
  }
}
