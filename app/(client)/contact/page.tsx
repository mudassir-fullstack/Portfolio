"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
toast.success("Message sent successfully!")
      
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus(`❌ ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      setStatus("❌ Server error while sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-6 pb-36 md:pb-28 fade-in-up">
      <h2>Contact Me</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full placeholder-(--primary)"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full placeholder-(--primary)"
        />
<input
  type="text"
  name="phone"
  placeholder="Phone (optional)"
  value={form.phone}
  onChange={handleChange}
  className="border p-2 rounded w-full placeholder-(--primary) "
/>
        
        <div className="col-span-1 sm:col-span-2">
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="border p-2 rounded w-full placeholder-(--primary)"
          />
        </div>

        <div className="col-span-1  sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="border float-end px-4 py-2 rounded w-full sm:w-auto"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
         <Toaster />
      </form>
    </section>
  );
};

export default ContactPage;
