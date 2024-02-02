import { Request, Response } from "express";
import { ReminderService } from "../services/reminderService";

const reminderService = new ReminderService();

export class ReminderController {
  async createReminder(req: Request, res: Response): Promise<void> {
    const { title, content } = req.body;
    try {
      const createdReminder = await reminderService.createReminder(
        title,
        content
      );
      res.json(createdReminder);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async listAllReminders(req: Request, res: Response): Promise<void> {
    try {
      const reminders = await reminderService.listAllReminders();
      res.json({ reminders });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getReminder(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id); // id na URL
      const reminder = await reminderService.getReminder(id);

      if (reminder) {
        res.json({ reminder });
      } else {
        res.status(500).json({ erro: "Lembrete não encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteReminder(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const reminder = await reminderService.deleteReminder(id);

      if (reminder) {
        res.json({ reminder });
      } else {
        res.status(500).json({ error: "Lembrete não encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateReminder(req: Request, res: Response): Promise<void> {
    const { title, content } = req.body;
    const id = Number(req.params.id);
    try {
      const updatedReminder = await reminderService.updateReminder(
        id,
        title,
        content
      );
      res.json(updatedReminder);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
