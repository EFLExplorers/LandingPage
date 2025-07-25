import { supabase } from "../auth/supabaseClient";

/**
 * Debug authentication issues and provide detailed error information
 */
export const debugAuth = async (email: string, password: string) => {
  console.log("🔐 Debugging Authentication...");
  
  // Check if user exists in auth
  console.log("📧 Checking if user exists...");
  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error("❌ Error checking users:", error);
    } else {
      const userExists = users?.some(user => user.email === email);
      console.log(`👤 User exists in auth: ${userExists ? 'Yes' : 'No'}`);
      
      if (userExists) {
        const user = users?.find(u => u.email === email);
        console.log("📋 User details:", {
          id: user?.id,
          email: user?.email,
          email_confirmed_at: user?.email_confirmed_at,
          created_at: user?.created_at,
          last_sign_in_at: user?.last_sign_in_at
        });
      }
    }
  } catch (error) {
    console.log("⚠️ Cannot check users (admin access required)");
  }
  
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
 */
export const checkUserStatus = async (email: string) => {
  console.log("🔍 Checking user status for:", email);
  
  try {
    // Try to get user by email (this might not work without admin access)
    const { data, error } = await supabase.auth.admin.getUserById(email);
    
    if (error) {
      console.log("⚠️ Cannot check user status (admin access required)");
      return null;
    }
    
    return data.user;
  } catch (error) {
    console.log("⚠️ Cannot check user status");
    return null;
  }
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