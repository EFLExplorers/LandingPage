import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, action } = req.body;

  // Ensure user is an admin
  const { data: adminData, error: adminError } = await supabaseAdmin
    .from("users")
    .select("role")
    .eq("email", email)
    .single();

  if (adminError || adminData.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (action === "approve-teacher") {
    const { emailToApprove } = req.body;

    const { error } = await supabaseAdmin
      .from("teachers")
      .update({ approved: true })
      .eq("email", emailToApprove);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(200)
      .json({ message: `Teacher ${emailToApprove} approved!` });
  }

  return res.status(400).json({ message: "Invalid action" });
}
