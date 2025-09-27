import React, { useState, useEffect } from "react";
import SpotCard from "../components/SpotCard";
import { load, save } from "../utils/storage";

export default function Exams() {
  const [exams, setExams] = useState(() => load("exams", []));
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(""); // 🔥 error state

  const [form, setForm] = useState({
    subject: "",
    code: "",
    date: "",
    type: "Midterm",
    syllabus: [""],
  });

  useEffect(() => save("exams", exams), [exams]);

  function resetForm() {
    setForm({
      subject: "",
      code: "",
      date: "",
      type: "Midterm",
      syllabus: [""],
    });
    setEditId(null);
    setError("");
  }

  function addOrUpdate() {
    // ✅ Validation
    if (!form.subject.trim()) {
      setError("Subject name is required.");
      return;
    }
    if (!form.date) {
      setError("Please select a date for the exam.");
      return;
    }

    if (editId) {
      setExams((prev) =>
        prev.map((e) => (e.id === editId ? { ...form, id: editId } : e))
      );
    } else {
      setExams((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    resetForm();
    setShowModal(false);
  }

  function del(id) {
    setExams((prev) => prev.filter((e) => e.id !== id));
  }

  function edit(exam) {
    setForm(exam);
    setEditId(exam.id);
    setError("");
    setShowModal(true);
  }

  function statusFor(dateStr) {
    const now = new Date();
    const d = new Date(dateStr);
    return d >= now ? "upcoming" : "completed";
  }

  // Group exams by type
  const grouped = exams.reduce((acc, ex) => {
    if (!acc[ex.type]) acc[ex.type] = [];
    acc[ex.type].push(ex);
    return acc;
  }, {});

  return (
    <div className="space-y-6 pb-20">
      {/* Calendar Card */}
      <SpotCard className="p-4 sm:p-6">
        <h2 className="text-lg font-semibold mb-3">Exam Calendar</h2>
        <ul className="space-y-2 text-sm">
          {exams
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((ex) => (
              <li
                key={ex.id}
                className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <span className="mb-1 sm:mb-0">
                  {new Date(ex.date).toLocaleDateString()} -{" "}
                  <strong>{ex.subject}</strong> ({ex.type})
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-center w-fit sm:w-auto ${
                    statusFor(ex.date) === "upcoming"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {statusFor(ex.date)}
                </span>
              </li>
            ))}
        </ul>
      </SpotCard>

      {/* Groups by Exam Type */}
      {Object.keys(grouped).map((type) => (
        <div key={type}>
          <h3 className="text-lg sm:text-xl font-bold mb-2">{type}s</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped[type].map((ex) => (
              <SpotCard key={ex.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div>
                    <div className="font-semibold">
                      {ex.subject} ({ex.code})
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(ex.date).toLocaleString()}
                    </div>
                    <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                      {ex.syllabus.map(
                        (ch, idx) => ch && <li key={idx}>{ch}</li>
                      )}
                    </ul>
                  </div>
                  <div className="flex sm:flex-col gap-2 self-end sm:self-start">
                    <button
                      onClick={() => edit(ex)}
                      className="px-3 py-1 rounded-md bg-yellow-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => del(ex.id)}
                      className="px-3 py-1 rounded-md border"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </SpotCard>
            ))}
          </div>
        </div>
      ))}

      {/* Floating Add Exam Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-5 py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
        >
          + Add Exam
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Exam" : "Add Exam"}
            </h2>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {/* 🔥 Show Error if exists */}
              {error && (
                <p className="text-red-400 text-sm font-medium">{error}</p>
              )}

              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Subject name"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600"
              />
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="Subject code"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600"
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600"
              />
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600"
              >
                <option>Midterm</option>
                <option>Final</option>
                <option>Quiz</option>
                <option>Revision</option>
              </select>

              {/* Dynamic syllabus */}
              <div>
                <p className="text-sm mb-2">Syllabus (up to 10 chapters):</p>
                {form.syllabus.map((ch, idx) => (
                  <input
                    key={idx}
                    value={ch}
                    onChange={(e) => {
                      const newSyllabus = [...form.syllabus];
                      newSyllabus[idx] = e.target.value;
                      setForm({ ...form, syllabus: newSyllabus });
                    }}
                    placeholder={`Chapter ${idx + 1}`}
                    className="w-full px-3 py-2 mb-2 rounded-md bg-gray-800 border border-gray-600"
                  />
                ))}
                {form.syllabus.length < 10 && (
                  <button
                    onClick={() =>
                      setForm({ ...form, syllabus: [...form.syllabus, ""] })
                    }
                    className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm"
                  >
                    + Add Chapter
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
                className="px-4 py-2 rounded-md border border-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addOrUpdate}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white"
              >
                {editId ? "Save Changes" : "Add Exam"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
