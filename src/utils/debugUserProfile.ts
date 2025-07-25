import { supabase } from "../auth/supabaseClient";

/**
 * Debug utility to check if a user exists in the users table
 * This helps identify if the issue is with missing user records
 */
export const debugUserProfile = async (userId: string) => {
  try {
    console.log("🔍 Debugging user profile for ID:", userId);
    
    // Check if user exists in auth
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error("❌ Auth error:", authError);
      return { exists: false, error: "Auth error" };
    }
    
    console.log("✅ Auth user found:", authData.user?.email);
    
    // Check if user exists in users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    
    if (userError) {
      console.error("❌ Users table error:", userError);
      if (userError.code === 'PGRST116') {
        console.warn("⚠️ User not found in users table - this is likely the issue!");
        return { exists: false, error: "User not found in users table" };
      }
      return { exists: false, error: userError.message };
    }
    
    console.log("✅ User found in users table:", userData);
    return { exists: true, data: userData };
    
  } catch (error) {
    console.error("❌ Debug error:", error);
    return { exists: false, error: "Debug error" };
  }
};

/**
 * Check if the current user has a profile in the users table
 */
export const checkCurrentUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.log("❌ No authenticated user");
    return false;
  }
  
  return await debugUserProfile(user.id);
}; 