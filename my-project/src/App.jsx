import { Routes, Route, NavLink } from "react-router-dom";
import SignUp from "./routes/SignUp";
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
      <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">Attendance & Exam Tracker</h1>

        <div className="flex items-center gap-4">
          <nav className="flex gap-2">
            {[
              "/",
              "/dashboard",
              "/attendance",
              "/subjects",
              "/exams",
              "/contact",
            ].map((path, i) => {
              const label = [
                "Sign Up",
                "Dashboard",
                "Attendance",
                "Subjects",
                "Exams",
                "Contact",
              ][i];
              return (
                <NavLink
                  key={path}
                  to={path}
                  end={i === 0}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all duration-300
     ${
       isActive
         ? "bg-gray-500 text-white shadow-[0_0_10px_#ec4899]"
         : "hover:bg-indigo-100 dark:hover:bg-indigo-500 hover:shadow-[0_0_10px_#ec4899]"
     }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<SignUp />} />
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
