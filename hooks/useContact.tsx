"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: ContactType) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/contact", data);
      setSuccess(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, success, error };
};

export function ContactList() {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("/api/contact");
        setContacts(res.data.data);

      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []); 
  return {contacts, loading, error}
}
