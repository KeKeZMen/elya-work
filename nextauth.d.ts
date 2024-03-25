import { DefaultSession, DefaultUser } from "next-auth";

interface DefaultUser {
  id: number;
}

interface IUser extends DefaultUser {
  id: number;
}

declare module "next-auth" {
  interface User extends IUser {
    id: number;
  }

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {
    id: number;
  }
}
