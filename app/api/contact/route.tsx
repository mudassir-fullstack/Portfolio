export const dynamic = "force-dynamic";

import { POST as POST_CONTACT, GET as GET_CONTACT } from "@/controllers/contactController";
import { connectDB } from "@/lib/db";

// ✅ Professional + production-safe version
export const POST = async (req: Request) => {
  await connectDB(); // ensure DB connection (especially needed on Vercel)
  return POST_CONTACT(req);
};

export const GET=async ()=>{
  await connectDB();
  return GET_CONTACT();
}
