// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // pega todos os reminders existentes
// export const getAllReminders = async () => {
//   return prisma.reminder.findMany();
// };

// export const getReminder = async (id: number) => {
//   return prisma.reminder.findUnique({
//     where: { id },
//   });
// };

// export const createReminder = async (
//   title: string,
//   content: string,
//   dueDate: string
// ) => {
//   return prisma.reminder.create({
//     data: {
//       title,
//       content,
//       dueDate: new Date(dueDate),
//     },
//   });
// };

// // Atualiza os reminders
// export const updateReminder = async (
//   id: number,
//   title: string,
//   content: string,
//   dueDate: string
// ) => {
//   return prisma.reminder.update({
//     where: { id },
//     data: {
//       title,
//       content,
//       dueDate,
//     },
//   });
// };

// // deleta Reminders
// export const deleteReminder = async (id: number) => {
//   return prisma.reminder.delete({
//     where: { id },
//   });
// };

// export const deleteAllReminders = async () => {
//   try {
//     const deletedAllReminders = await prisma.reminder.deleteMany();

//     return {
//       success: true,
//       message: "Todos os lembretes foram deletados.",
//       deletedAllReminders,
//     };
//   } catch (err: any) {
//     console.error("Erro ao deletar lembretes: ", err);
//     return {
//       success: false,
//       message: "Erro ao deletar lembretes.",
//       err: err.message,
//     };
//   }
// };
