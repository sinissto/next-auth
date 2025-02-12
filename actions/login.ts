"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Email does not exist" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    //  Send verification token email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Conformation email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // todo: Verify 2FA code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      console.log("Verify 2FA code");
      console.log({ twoFactorToken });
      if (!twoFactorToken) return { error: "Invalid code" };

      if (twoFactorToken.token !== code) return { error: "Invalid code" };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Code expired" };

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      console.log({ twoFactorToken });
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Successfully logged in" };
  } catch (error: any) {
    console.log("*********************************");
    console.log("******* GRESKA IZ login.ts ******");
    console.log("*********************************");
    console.log(error);
    if (error.type === "CredentialsSignin") {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    if (error.type === "AccessDenied")
      return { error: "Access Denied! Something went wrong!" };

    throw error;
  }
};
