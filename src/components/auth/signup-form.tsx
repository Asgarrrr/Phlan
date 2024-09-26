"use client"

import { useRouter } from "next/navigation"
import { socialProviders } from "./utils";
import { useActionState, useEffect, useRef } from "react";
import { signup } from "@/app/(auth)/signup/actions"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Fingerprint from "@/components/fingerprint"
import { getMessageFromCode } from "@/lib/constants";
import { toast } from "sonner";

const formSchema = z.object({
    provider: z
        .enum( [ "credentials", "google", "github" ] ),
    email: z
        .string()
        .email("Invalid email address")
        .max( 100, "Email address is too long, please use a shorter one" ),
    password: z
        .string()
        .min( 8, "Password must be at least 8 characters long" )
        .max( 100, "Password is too long, please use a shorter one" )
        .refine(( p ) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test( p ), {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
})


export default function SignUpForm( ) {

    const router = useRouter()
    const [ result, dispatch ] = useActionState( signup, undefined )

    const formRef = useRef<HTMLFormElement>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver( formSchema ),
        defaultValues: {
            provider: "credentials",
        },
    })

    function onSubmit( values: z.infer<typeof formSchema> ) {   
        formRef.current && dispatch( new FormData( formRef.current ) )
    }

    useEffect(() => {

        if ( !result ) 
            return

        if ( result.type === "error" ) {
            toast.error( getMessageFromCode( result.resultCode ) )
        } else {
            toast.success( getMessageFromCode( result.resultCode ) )
            router.refresh()
        }

    }, [ result, router ])
    
    
    return (
        <Card className="w-full sm:w-96 backdrop-blur-[0.2px] supports-backdrop-blur:bg-background/60 dark:bg-neutral-950/80">
            <CardHeader className="space-y-1">
                <div className="bg-neutral-900/50 rounded-full size-12 p-2 mb-5">
                    <Fingerprint />
                </div>
                <CardTitle className="font-semibold tracking-tight text-2xl">
                    Create your account
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                    Welcome — Please fill in the details to get started 
                </CardDescription>
            </CardHeader>
            <CardContent>

                <div className="flex flex-col gap-4">
                    { socialProviders.map( ( provider ) => (
                        <form
                            key={ provider.id }
                            action={ dispatch }
                            className="flex items-center gap-4"
                        >
                            <input type="hidden" name="provider" value={ provider.id } />
                            <Button
                                type="submit"
                                className="w-full gap-2"
                                variant="outline"
                            >
                                { provider.icon } 
                                <span>
                                    Sign up with { provider.name }
                                </span>
                            </Button>
                        </form>
                    ) ) }
                </div>

                <div className="flex items-center gap-4 mt-5 mb-4">
                    <Separator className="flex-1" />
                    <span className="text-muted-foreground">or</span>
                    <Separator className="flex-1" />
                </div>

                <Form {...form}>
                    <form ref={ formRef } onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-6">
                        <FormField
                            control={ form.control }
                            name="provider"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={ form.control }
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Email</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Input 
                                            placeholder="you@example.com"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={ form.control }
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="• • • • • • • • • • • • • • • •" 
                                            type="password" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
    
}
