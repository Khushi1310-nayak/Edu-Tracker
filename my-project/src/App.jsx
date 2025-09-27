import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Attendance from "./routes/Attendance";
import Subjects from "./routes/Subjects";
import Exams from "./routes/Exam";
import Contact from "./routes/Contact";

import "./App.css";

function App() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white
                 dark:from-gray-900 dark:to-gray-800
                 text-gray-900 dark:text-gray-100
                 transition-colors duration-500"
    >
      {/* Navbar */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-center sm:text-left">
          Edu-Tracker
        </h1>

        <nav className="flex flex-wrap justify-center sm:justify-end gap-2">
          {[
            { path: "/", label: "Dashboard" },
            { path: "/attendance", label: "Attendance" },
            { path: "/subjects", label: "Subjects" },
            { path: "/exams", label: "Exams" },
            { path: "/contact", label: "Feedback" },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm sm:text-base transition-all duration-300 ${
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          {/* Set Dashboard as the default route */}
          <Route path="/" element={<Dashboard />} />
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
