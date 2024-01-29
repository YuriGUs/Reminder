import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

//Rota para registrar um novo usuári
router.post("/register", authController.registerUser);

export default router;
