/**
 * Debug utility to check Supabase connection configuration
 * This helps identify connection issues and URL mismatches
 */
export const debugSupabaseConnection = () => {
  console.log("🔍 Debugging Supabase Connection...");
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log("📋 Environment Variables:");
  console.log("  NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl);
  console.log("  NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "NOT SET");
  
  // Check if URL is valid
  if (supabaseUrl) {
    try {
      const url = new URL(supabaseUrl);
      console.log("✅ URL is valid:", url.hostname);
      
      // Check for known URL patterns
      if (supabaseUrl.includes("eflexplorers-ddvpckdfcfqwtjxdgvhb")) {
        console.warn("⚠️ Using URL from env-template.txt - this may not be correct!");
        console.log("💡 This URL appears to be from your template file");
      } else if (supabaseUrl.includes("ldxprwemugqomkaroaqp")) {
        console.log("✅ Using URL from vercel.json - this was working before");
      } else if (supabaseUrl.includes("mamawoullxushoweknbw")) {
        console.log("✅ Using URL from vercel.json - this was working before");
      }
      
      // Test DNS resolution
      console.log("🌐 Testing DNS resolution...");
      fetch(supabaseUrl + "/rest/v1/", {
        method: 'GET',
        headers: {
          'apikey': supabaseKey || '',
          'Authorization': `Bearer ${supabaseKey || ''}`
        }
      })
      .then(response => {
        console.log("✅ Supabase connection successful:", response.status);
      })
      .catch(error => {
        console.error("❌ Supabase connection failed:", error.message);
        console.log("🔧 Troubleshooting tips:");
        console.log("  1. Check if the Supabase URL is correct");
        console.log("  2. Verify your internet connection");
        console.log("  3. Check if Supabase service is down");
        console.log("  4. Verify the API key is correct");
        
        // Specific guidance for URL issues
        if (error.message.includes("ERR_NAME_NOT_RESOLVED")) {
          console.log("🚨 DNS Resolution Error - URL cannot be found!");
          console.log("💡 Solutions:");
          console.log("  - Check your Supabase dashboard for the correct URL");
          console.log("  - Update your .env.local file with the correct URL");
          console.log("  - Make sure you're using the right project");
        }
      });
      
    } catch (error) {
      console.error("❌ Invalid URL format:", error);
    }
  } else {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL is not set!");
  }
  
  // Check for common issues
  console.log("🔍 Common Issues Check:");
  
  if (!supabaseUrl) {
    console.log("  ❌ Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  
  if (!supabaseKey) {
    console.log("  ❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  
  if (supabaseUrl && supabaseUrl.includes("localhost")) {
    console.log("  ⚠️ Using localhost URL - make sure Supabase is running locally");
  }
  
  if (supabaseUrl && supabaseUrl.includes("supabase.co")) {
    console.log("  ✅ Using Supabase cloud URL");
  }
  
  // Check for URL mismatches
  const knownUrls = [
    "https://ldxprwemugqomkaroaqp.supabase.co",
    "https://mamawoullxushoweknbw.supabase.co", 
    "https://eflexplorers-ddvpckdfcfqwtjxdgvhb.supabase.co"
  ];
  
  if (supabaseUrl && !knownUrls.includes(supabaseUrl)) {
    console.warn("⚠️ Unknown Supabase URL - verify this is correct");
  }
  
  return {
    url: supabaseUrl,
    keyExists: !!supabaseKey,
    isValidUrl: supabaseUrl ? /^https?:\/\/.+/.test(supabaseUrl) : false
  };
};

/**
 * Test Supabase connection with a simple query
 */
export const testSupabaseConnection = async () => {
  console.log("🧪 Testing Supabase connection...");
  
  try {
    const { createClient } = await import("@supabase/supabase-js");
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing environment variables");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Try a simple query
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error("❌ Supabase query failed:", error);
      return { success: false, error };
    }
    
    console.log("✅ Supabase connection and query successful");
    return { success: true, data };
    
  } catch (error) {
    console.error("❌ Supabase connection test failed:", error);
    return { success: false, error };
  }
}; 