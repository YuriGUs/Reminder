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
}
