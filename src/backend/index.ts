import express from "express";
import cors from "cors";
import reminderRoutes from "./routes/ReminderRoutes"; // lembrar de importar novas rotas para o servidor principal
import loginRoutes from "./routes/loginRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", reminderRoutes);
app.use("/api", loginRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
