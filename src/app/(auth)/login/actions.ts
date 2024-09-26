"use server"

import { signIn } from "@/auth"
import { ResultCode } from "@/lib/constants";
import { redis } from "@/lib/redis"
import { User } from "@/lib/types";
import { AuthError } from "next-auth";
import { z } from "zod";

interface Result {
    type: string
    resultCode: ResultCode
}  

export async function getUser( email: string ) {
    return await redis.hgetall<User>( `user:${ email }` )
}

export async function authenticate(
    _prevState: Result | undefined,
    formData: FormData
): Promise<Result | undefined> {

    try {
        if ( !formData.has( "provider" ) )
            throw new AuthError( "No provider specified" )

        const provider = formData.get( "provider" )

        if ( ![ "credentials", "github", "google" ].includes( provider as string ) )
            throw new AuthError( "Invalid provider" )

        if ( provider === "credentials" ) {
            
            const email     = formData.get( "email" )
                , password  = formData.get( "password" )

            const parsedCredentials = z
                .object({
                    email: z.string().email(),
                    password: z.string().min(6)
                })
                .safeParse({
                    email,
                    password
                })

            if ( !parsedCredentials.success )
                return { type: "error", resultCode: ResultCode.InvalidCredentials }

            await signIn( "credentials", {
                email,
                password,
                redirect: false
            })

            return {
                type: "success",
                resultCode: ResultCode.UserLoggedIn
            }

        }

    } catch ( error ) {
        console.error( error )
        return { type: "error", resultCode: ResultCode.UnknownError }
    } 
    await signIn( formData.get( "provider" ) as string )
}