import express from "express";
import cors from "cors";
import reminderRoutes from "./routes/ReminderRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", reminderRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
