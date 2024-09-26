import LoginForm from "@/components/auth/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export default async function LoginPage( ) {

    const session = ( await auth() ) as Session
  
    if ( session )
        redirect( "/" )

    return <LoginForm />

}