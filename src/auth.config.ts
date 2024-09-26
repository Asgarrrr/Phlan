import type { NextAuthConfig } from "next-auth"

export const authConfig = {

    secret: process.env.AUTH_SECRET,

    pages: {
        signIn  : "/login",
        newUser : "/signup"
    },

    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {
        
            const isLoggedIn     = !!auth?.user
                , isOnLoginPage  = nextUrl.pathname.startsWith( "/login" )
                , isOnSignupPage = nextUrl.pathname.startsWith( "/signup" )

            if ( isLoggedIn )
                if ( isOnLoginPage || isOnSignupPage )
                    return Response.redirect( new URL( "/", nextUrl ) )

            return true
    
        },

        async jwt({ token, user }) {

            return user ? { ...token, id: user.id } : token
        
        },

        async session({ session, token }) {

            if ( token ) {

                const { id }   = token as { id: string }
                    , { user } = session

                session = { ...session, user: { ...user, id } }

            }

            return session
        }
    },

    providers: []

} satisfies NextAuthConfig