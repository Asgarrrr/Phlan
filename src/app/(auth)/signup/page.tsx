import SignUpForm from "@/components/auth/signup-form";
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export default async function SignInPage( ) {
    
    const session = ( await auth() ) as Session

    console.log( session )

    if ( session )
        redirect( "/" )

    return <SignUpForm />

}