import { use } from 'react'
import {connectDB} from '@/lib/db'
import {  PATCH as PATCH_ABOUT, DELETE as DELETE_ABOUT, GET_BY_ID } from "@/controllers/aboutController";

// ✅ CORRECT - Await params first, then access id
export const GET = async(
  req: Request,
  {params}: {params: Promise<{id: string}>}
) => {
  await connectDB();
  return GET_BY_ID(req, { params });  
}
// PATCH update about
export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();
  return PATCH_ABOUT(req, {params});
};

// DELETE about
export const DELETE = async (
  req: Request,
  { params }:{ params: Promise<{id: string}> }
) => {
  await connectDB();
  return DELETE_ABOUT(req, {params});
}