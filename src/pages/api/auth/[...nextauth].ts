import NextAuth from "next-auth";
import nextAuthOptions from "@/auth/nextAuthConfig";
import { AuthOptions } from "next-auth";

export default NextAuth(nextAuthOptions as AuthOptions);
