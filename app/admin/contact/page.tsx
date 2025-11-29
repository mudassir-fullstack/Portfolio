"use client"
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { ContactType } from "@/types/contact";
import { ContactList } from "@/hooks/useContact";

export default function ContactTable() {
  const { contacts, loading, error } = ContactList();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;

  return (
    <section className="py-5">
      <div className="grid grid-cols-2 mb-4">
        <h3 className="">Contact Messages</h3>
      </div>

      <table className="">
        <thead>
          <tr>
            <th >Name</th>
            <th >Email</th>
            <th >Phone</th>
            <th >Message</th>

          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No Contact Messages Exist
              </td>
            </tr>
          ) : (
            contacts.map((val: ContactType) => (
              <tr key={val._id} className="">
                <td className="border px-4 py-2">{val.name}</td>
                <td className="border px-4 py-2">{val.email}</td>
                <td className="border px-4 py-2">{val.phone || "-"}</td>
                <td className="border px-4 py-2">{val.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Toaster />
    </section>
  );
}
