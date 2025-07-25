import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Service role key exists:', !!serviceRoleKey);

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing environment variables:', { 
    hasUrl: !!supabaseUrl, 
    hasServiceKey: !!serviceRoleKey 
  });
}

const supabase = createClient(
  supabaseUrl!,
  serviceRoleKey! // Use service role key for admin operations
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Route called:', req.method, req.url);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, email, firstName, lastName, role } = req.body;
    console.log('Received data:', { userId, email, firstName, lastName, role });

    if (!userId || !email || !firstName || !lastName || !role) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Attempting to create user profile with service role...');
    
    // Create user profile using service role (bypasses RLS)
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email,
          first_name: firstName,
          last_name: lastName,
          role,
          approved: role === 'student' ? true : false, // Students auto-approved
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Profile creation error:', error);
      return res.status(500).json({ error: `Failed to create user profile: ${error.message}` });
    }

    console.log('User profile created successfully:', data);
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 