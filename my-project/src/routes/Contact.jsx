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

    send("service_9tbysbc", "template_vz3kb1t", form, "F2QOgnDZ3MLTP5-7N")
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 p-6 sm:p-8 md:p-12 rounded-xl shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-white">
            Feedback
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-3 py-2 border rounded-md h-28 sm:h-32 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 sm:py-3 rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            >
              Send Message
            </button>
          </form>
          {status && (
            <p className="mt-4 text-center text-sm sm:text-base text-white">
              {status}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-4 text-sm sm:text-base mt-auto">
        <p>© {new Date().getFullYear()} Manisa Nayak. All rights reserved.</p>
        <p className="mt-1">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
}
