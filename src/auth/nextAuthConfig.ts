import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { supabase } from "./supabaseClient";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
;

const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials!;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Supabase login error:", error.message);
          throw new Error(error.message);
        }

        if (data.user) {
          return {
            id: data.user.id,
            email: data.user.email,
            role: data.user.user_metadata.role || "student",
          };
        }

        return null;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
    updateAge: 15 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: any }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      session.user.role = token.role as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default nextAuthOptions;
