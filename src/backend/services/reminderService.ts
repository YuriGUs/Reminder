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
}
