import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../auth/supabaseClient";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  userRole: "student" | "teacher" | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        // Fetch user role from database
        try {
          const { data: userData, error: userError } = await supabase
            .from("profiles")
            .select("role, status")
            .eq("id", session.user.id)
            .single();

          if (userError) {
            console.error("User role fetch error:", userError);
            if (userError.code === 'PGRST116') {
              // No rows returned - user doesn't exist in profiles table
              console.warn("User profile not found in profiles table for ID:", session.user.id);
              setUserRole(null);
            } else {
              console.error("Error fetching user role:", userError);
              setUserRole(null);
            }
          } else {
            setUserRole(userData?.role ?? null);
          }
        } catch (error) {
          console.error("Error in user role fetch:", error);
          setUserRole(null);
        }
      }

      setLoading(false);
    };

    checkSession();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          const { data: userData, error: userError } = await supabase
            .from("profiles")
            .select("role, status")
            .eq("id", session.user.id)
            .single();

          if (userError) {
            console.error("User role fetch error:", userError);
            if (userError.code === 'PGRST116') {
              // No rows returned - user doesn't exist in profiles table
              console.warn("User profile not found in profiles table for ID:", session.user.id);
              setUserRole(null);
            } else {
              console.error("Error fetching user role:", userError);
              setUserRole(null);
            }
          } else {
            setUserRole(userData?.role ?? null);
          }
        } catch (error) {
          console.error("Error in user role fetch:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
