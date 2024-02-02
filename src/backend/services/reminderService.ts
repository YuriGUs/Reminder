import { PrismaClient, Reminder } from "@prisma/client";

const prisma = new PrismaClient();

export class ReminderService {
  async createReminder(title: string, content: string): Promise<Reminder> {
    try {
      const reminder = await prisma.reminder.create({
        data: {
          title,
          content,
        },
      });
      return reminder;
    } catch (error: any) {
      throw new Error(`Erro ao criar lembretes: ${error.message}`);
    }
  }

  async listAllReminders(): Promise<Reminder[]> {
    try {
      const reminders = await prisma.reminder.findMany();
      return reminders;
    } catch (error: any) {
      throw new Error(`Erro ao listar lembretes: ${error.message}`);
    }
  }

  async getReminder(id: number): Promise<Reminder | null> {
    try {
      const reminder = await prisma.reminder.findUnique({ where: { id } });
      return reminder;
    } catch (error: any) {
      console.error("Erro ao obter lembrete: ", error);
      throw error;
    }
  }

  async deleteReminder(id: number): Promise<Reminder> {
    try {
      const reminder = await prisma.reminder.delete({ where: { id } });
      return reminder;
    } catch (error: any) {
      console.log("Error ao deletar lembrete: ", error);
      throw error;
    }
  }

  async updateReminder(
    id: number,
    title: string,
    content: string
  ): Promise<Reminder> {
    try {
      const reminder = await prisma.reminder.update({
        where: { id },
        data: {
          title,
          content,
        },
      });
      return reminder;
    } catch (error: any) {
      console.error("Erro ao atualizar lembrete: ", error);
      throw error;
    }
  }
}
