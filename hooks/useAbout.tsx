"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import type { About as AboutType } from "@/types/about";

// Get all about data
export function useAbout() {
  const [data, setData] = useState<AboutType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await axios.get("/api/about");
        setData(res.data.data || '');
      } catch (err: any) {
 setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  return { data, loading, error };
}

// Get single about by ID
export function useAboutById(id: string) {
  const [data, setData] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
console.log("Start")
  useEffect(() => {
console.log("internal")

    if (!id) return;
    
    async function fetchAbout() {
      try {
        const res = await axios.get(`/api/about/${id}`);
        setData(res.data.data);
        console.log("fetch data", res.data.data)
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, [id]);

  return { data, loading, error };
}

//Update
export async function updateAbout(id: string, formData: FormData) {
  if (!id) throw new Error("id is undefined"); // safety
  const res = await axios.patch(`/api/about/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// Delete about
export async function deleteAbout(id: string) {
  const res = await axios.delete(`/api/about/${id}`);
  return res.data;
}

//Create
export async function createAbout(formData:FormData){
  const res=await axios.post(`/api/about`, formData);
  return res.data;
}

