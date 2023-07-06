import NextAuth from "next-auth/next";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "",
            clientSecret: ""
        })
    ],
    async session({ session }) {

    },

    async signIn({ profile }) {

    },
})

export { handler as GET, handler as POST }