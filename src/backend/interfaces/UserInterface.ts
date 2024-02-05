import { User } from "@prisma/client";

export interface UserResponse {
  user: Pick<User, "id" | "email">;
  token: string;
}

export interface UserData {
  email: string;
  password: string;
}
