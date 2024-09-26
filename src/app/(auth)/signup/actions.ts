"use server"

import { getStringFromBuffer } from "@/lib/utils";
import z from "zod";
import { ResultCode } from "@/lib/constants";
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { getUser } from "../login/actions";
import { redis } from "@/lib/redis";


export async function createUser(
    email           : string,
    hashedPassword  : string,
    salt            : string
) {

    const existingUser = await getUser( email )

    if ( existingUser ) {
        return {
            type        : "error",
            resultCode  : ResultCode.UserAlreadyExists
        }
    }
        
    const user = {
        id       : crypto.randomUUID(),
        password : hashedPassword,
        email,
        salt
    }

    await redis.hmset( `user:${ email }`, user )

    return {
        type: "success",
        resultCode: ResultCode.UserCreated
    }

}

interface Result {
    type        : string
    resultCode  : ResultCode
}

export async function signup(
    _prevState: Result | undefined,
    formData: FormData
  ): Promise<Result | undefined> {

    const email     = formData.get( "email" ) as string
        , password  = formData.get( "password" ) as string
        , provider  = formData.get( "provider" ) as string

    if ( provider === "credentials" ) {

        const parsedCredentials = z
            .object({
                email   : z.string().email(),
                password: z
                    .string()
                    .min( 6 )
                    .regex( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/ )
                    .describe( "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character" )
            })
            .safeParse({
                email,
                password
            })

        if ( !parsedCredentials.success )
            return { type: "error", resultCode: ResultCode.InvalidCredentials }

        const salt           = crypto.randomUUID()
            , encoder        = new TextEncoder()
            , saltedPassword = encoder.encode( password + salt )
        
        const hashedPasswordBuffer = await crypto.subtle.digest(
            "SHA-256",
            saltedPassword
        )

        const hashedPassword = getStringFromBuffer( hashedPasswordBuffer )

        try {

            const result = await createUser( email, hashedPassword, salt )

            if ( result.resultCode === ResultCode.UserCreated ) {
                await signIn( "credentials", {
                    email,
                    password,
                    redirect: false,
                })
            }
            return result
        
        } catch ( error ) {

            return {
                type       : "error",
                resultCode : error instanceof AuthError && error.type === "CredentialsSignin"
                    ? ResultCode.InvalidCredentials
                    : ResultCode.UnknownError
            }
        
        }

    }

        
    if ( [ "google", "github" ].includes( provider ) ) {
        await signIn( provider )
    }

}