import { supabase } from "../auth/supabaseClient";

/**
 * Debug authentication issues and provide detailed error information
 * Note: Removed admin API calls to prevent 403 errors
 */
export const debugAuth = async (email: string, password: string) => {
  console.log("🔐 Debugging Authentication...");
  
  // Test sign in with detailed error handling
  console.log("🔑 Testing sign in...");
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("❌ Sign in error:", error);
      console.log("🔍 Error details:");
      console.log("  Message:", error.message);
      console.log("  Status:", error.status);
      console.log("  Name:", error.name);
      
      // Provide specific guidance based on error
      if (error.message.includes("Invalid login credentials")) {
        console.log("💡 Possible solutions:");
        console.log("  1. Check if email and password are correct");
        console.log("  2. Verify the user account exists");
        console.log("  3. Check if email is confirmed");
      } else if (error.message.includes("Email not confirmed")) {
        console.log("💡 Solution: User needs to confirm their email");
      } else if (error.message.includes("Too many requests")) {
        console.log("💡 Solution: Wait a few minutes before trying again");
      }
      
      return { success: false, error };
    }
    
    console.log("✅ Sign in successful!");
    console.log("👤 User ID:", data.user?.id);
    console.log("📧 Email:", data.user?.email);
    
    return { success: true, data };
    
  } catch (error) {
    console.error("❌ Unexpected error during sign in:", error);
    return { success: false, error };
  }
};

/**
 * Check if a user exists and their status
 * Note: Removed admin API calls - this function now only provides guidance
 */
export const checkUserStatus = async (email: string) => {
  console.log("🔍 Checking user status for:", email);
  console.log("💡 Note: Cannot check user status from client-side (requires admin access)");
  console.log("💡 To check user status, use server-side functions with service role key");
  
  return null;
};

/**
 * Test password reset flow
 */
export const testPasswordReset = async (email: string) => {
  console.log("🔄 Testing password reset for:", email);
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) {
      console.error("❌ Password reset error:", error);
      return { success: false, error };
    }
    
    console.log("✅ Password reset email sent successfully");
    return { success: true };
    
  } catch (error) {
    console.error("❌ Unexpected error during password reset:", error);
    return { success: false, error };
  }
}; 