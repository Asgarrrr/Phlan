import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { z } from "zod";

import { authConfig } from "./auth.config";
import { getStringFromBuffer } from "./lib/utils";
import { redis } from "./lib/redis";

import { getUser } from "./app/(auth)/login/actions";


export const { auth, signIn, handlers, signOut } = NextAuth({
    
    ...authConfig,
    
    providers: [
        Credentials({

            async authorize( credentials ) {

                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6)
                    })
                .safeParse( credentials )

                if ( parsedCredentials.success ) {

                    const { email, password } = parsedCredentials.data
                    const user = await getUser( email )

                    if ( !user ) 
                        return null

                    const encoder       = new TextEncoder()
                        , saltedPassword = encoder.encode( password + user.salt )
                        , hashedPassword = getStringFromBuffer( await crypto.subtle.digest( "SHA-256", saltedPassword ) )

                    return hashedPassword === user.password ? user : null

                }

                return null

            }
        }),
        Github,
        Google,
    ],
    adapter: UpstashRedisAdapter( redis ),
})