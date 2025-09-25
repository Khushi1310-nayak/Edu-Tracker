import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignUp = () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      setError("Please fill all fields!");
      return;
    }

    // Save user info in localStorage (for demo purposes)
    localStorage.setItem("user", JSON.stringify(form));

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
<div className="bg-gray-600 p-12 rounded-xl shadow-lg w-full max-w-md min-h-[400px] flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleSignUp}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md mt-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
