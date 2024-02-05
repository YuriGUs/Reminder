import { Request, Response } from "express";
import { UserService } from "../User-service/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      // Extrai o email e a senha do corpo da requisição
      const { email, password } = req.body;

      // chama o método createUser do UserService e passa o email e a senha
      const result = await this.userService.createUser(email, password);

      // retorna o resultado
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Extrai o email e a senha do corpo da requisição
      const { email, password } = req.body;
      const result = await this.userService.loginUser(email, password);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
