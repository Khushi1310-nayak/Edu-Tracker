import React, { useState } from "react";
import { send } from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill all fields!");
      return;
    }

    // Send email with EmailJS
    send(
      "service_9tbysbc",
      "template_vz3kb1t",
      form,
      "F2QOgnDZ3MLTP5-7N"
    )
      .then(() => {
        setStatus("Message sent successfully! 💌");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error(err);
        setStatus("Oops! Something went wrong.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
<div className="bg-gray-600 p-12 rounded-xl shadow-lg w-full max-w-md min-h-[450px] flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Me</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-3 py-2 border rounded-md h-32"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-center text-sm">{status}</p>}
      </div>
    </div>
  );
}
