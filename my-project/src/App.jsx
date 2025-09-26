import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Attendance from "./routes/Attendance";
import Subjects from "./routes/Subjects";
import Exams from "./routes/Exam";
import Contact from "./routes/Contact";

import "./App.css";

function App() {
  // Check if user is "logged in"
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // If not logged in, redirect to some login/sign-up page
    // For now, let's just block access
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-800 dark:text-gray-200">
        <p>Please sign up first! 📝</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white
                 dark:from-gray-900 dark:to-gray-800
                 text-gray-900 dark:text-gray-100
                 transition-colors duration-500"
    >
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">Edu-Tracker</h1>

        <nav className="flex items-center gap-2">
          {[
            { path: "/dashboard", label: "Dashboard" },
            { path: "/attendance", label: "Attendance" },
            { path: "/subjects", label: "Subjects" },
            { path: "/exams", label: "Exams" },
            { path: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-gray-500 text-white shadow-[0_0_10px_#ec4899]"
                    : "hover:bg-indigo-100 dark:hover:bg-indigo-500 hover:shadow-[0_0_10px_#ec4899]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          {/* Redirect "/" to "/dashboard" */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
