import React, { useState, useEffect } from "react";
import SpotCard from "../components/SpotCard";
import { load, save } from "../utils/storage";

export default function Exams() {
  const [exams, setExams] = useState(() => load("exams", []));
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

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
  }

  function addOrUpdate() {
    if (!form.subject || !form.date) return;

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
    setShowModal(true);
  }

  function statusFor(dateStr) {
    const now = new Date();
    const d = new Date(dateStr);
    return d >= now ? "upcoming" : "completed";
  }

  // Group exams by type (Midterm, Final, Quiz, Revision)
  const grouped = exams.reduce((acc, ex) => {
    if (!acc[ex.type]) acc[ex.type] = [];
    acc[ex.type].push(ex);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Calendar Card */}
      <SpotCard className="p-6">
        <h2 className="text-lg font-semibold mb-3">Exam Calendar</h2>
        <ul className="space-y-2">
          {exams
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((ex) => (
              <li
                key={ex.id}
                className="flex justify-between text-sm border-b border-gray-700 pb-1"
              >
                <span>
                  {new Date(ex.date).toLocaleDateString()} -{" "}
                  <strong>{ex.subject}</strong> ({ex.type})
                </span>
                <span
                  className={`px-2 rounded-md ${
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
          <h3 className="text-xl font-bold mb-2">{type}s</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grouped[type].map((ex) => (
              <SpotCard key={ex.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">
                      {ex.subject} ({ex.code})
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(ex.date).toLocaleString()}
                    </div>

                    {/* Syllabus Chapters */}
                    <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                      {ex.syllabus.map(
                        (ch, idx) => ch && <li key={idx}>{ch}</li>
                      )}
                    </ul>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => edit(ex)}
                      className="px-3 py-1 rounded-md bg-yellow-500 text-white mr-2"
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
          className="px-6 py-3 rounded-full bg-indigo-600 text-white shadow-lg"
        >
          + Add Exam
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Exam" : "Add Exam"}
            </h2>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
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

              {/* Dynamic syllabus (up to 10 chapters) */}
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
