import { Router } from "express";
//import * as reminderController from "../controllers/reminderController";
import { ReminderController } from "../controllers/dasjd";

const router = Router();
const reminderControl = new ReminderController();

router.post("/reminders/create", reminderControl.createReminder);

// Rota para obter todos os lembretes
router.get("/reminders", async (req, res) => {
  const reminders = await reminderControl.listAllReminders(req, res);
  res.json(reminders);
});

// // Obter lembretes especifico
// router.get("/reminders/:id", async (req, res) => {
//   const { id } = req.params;
//   const reminder = await reminderController.getReminder(Number(id));
//   res.json(reminder);
// });

// // Rota para criar um lembrete
// router.post("/reminders/criar", async (req, res) => {
//   // desestrurando os objetos para dentro de req.body
//   const { title, content, dueDate } = req.body;
//   const newReminder = await reminderController.createReminder(
//     title,
//     content,
//     dueDate
//   );
//   res.json(newReminder);
// });

// // Rota para atualizar lembrete especifico
// router.get("/reminders/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, content, dueDate } = req.body;
//   const updateReminder = await reminderController.updateReminder(
//     Number(id),
//     title,
//     content,
//     dueDate
//   );
//   res.json(updateReminder);
// });

// // Rota para excluir um lembrete especifico
// router.delete("/reminders/:id", async (req, res) => {
//   const { id } = req.params;
//   await reminderController.deleteReminder(Number(id));
//   res.json({ message: "Lembrete excluido com sucesso!" });
// });

// // Rota para excluir todos os lembretes
// router.delete("/reminders", async (req, res) => {
//   const result = await reminderController.deleteAllReminders();
//   res.json(result);
// });

export default router;
