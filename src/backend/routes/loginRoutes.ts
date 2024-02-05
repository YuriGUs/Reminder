import { UserController } from "../modules/User/User-controller/userController";
import express from "express";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

export default router;
