import { Router } from "express";
//import * as reminderController from "../controllers/reminderController";
import { ReminderController } from "../controllers/reminderController";

const router = Router();
const reminderController = new ReminderController();

router.post("/reminders/create", reminderController.createReminder);
router.get("/reminders", reminderController.listAllReminders);
router.get("/reminders:id", reminderController.getReminder);
router.delete("/reminders:id", reminderController.deleteReminder);
router.put("/reminders:id", reminderController.updateReminder);

export default router;
