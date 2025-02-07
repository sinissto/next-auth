import { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendingUser = DefaultSession["user"] & { role: UserRole };

declare module "next-auth" {
  interface Session {
    user: ExtendingUser;
  }
}
