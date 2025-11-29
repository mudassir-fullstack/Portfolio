
import { GET as GET_ABOUT, POST as POST_ABOUT } from "@/controllers/aboutController";
import { connectDB } from "@/lib/db";

// GET single about
export const GET = async () => {
  await connectDB();
  return GET_ABOUT();
};

//POST 
export const POST=async(req:Request)=>{
  await connectDB();
return POST_ABOUT(req);
}


