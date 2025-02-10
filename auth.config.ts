import type { NextAuthConfig } from "next-auth"

import {LoginSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials)

                if(validatedFields.success){
                    const {email, password} = validatedFields.data

                    const user = await getUserByEmail(email)

                    if(!user || !user.password) return null

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(passwordMatch) return user
                }
                return null
            },
        }),

    ],
} satisfies NextAuthConfig