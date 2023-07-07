import NextAuth from "next-auth/next";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: `${process.env.GOOGLE_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
        })
    ],
    async session({ session }) {

    },

    async signIn({ profile }) {
        try {
            
        } catch (error) {
            
        }
    },
})

export { handler as GET, handler as POST }