import React, { useState, useEffect } from "react";
import SpotCard from "../components/SpotCard";
import { load, save } from "../utils/storage";

export default function Subjects() {
  const [subjects, setSubjects] = useState(() => load("subjects", []));
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    code: "",
    totalClasses: 0,
    attended: 0,
    labTotal: 0,
    labAttended: 0,
  });

  useEffect(() => save("subjects", subjects), [subjects]);

  function resetForm() {
    setForm({
      name: "",
      code: "",
      totalClasses: 0,
      attended: 0,
      labTotal: 0,
      labAttended: 0,
    });
    setEditingId(null);
  }

  function addOrUpdate() {
    if (!form.name || !form.code) return;

    if (editingId) {
      setSubjects((prev) =>
        prev.map((s) => (s.id === editingId ? { ...form, id: editingId } : s))
      );
    } else {
      setSubjects((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    resetForm();
    setShowModal(false);
  }

  function update(id, patch) {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  }

  function del(id) {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Empty state */}
      {subjects.length === 0 && (
        <SpotCard className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg text-center">
            No subjects added yet
          </p>
        </SpotCard>
      )}

      {/* Subject list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((s) => {
          const pct =
            s.totalClasses === 0
              ? 0
              : Math.round((s.attended / s.totalClasses) * 100);

          const labPct =
            s.labTotal === 0
              ? 0
              : Math.round((s.labAttended / s.labTotal) * 100);

          return (
            <SpotCard key={s.id} className="flex flex-col">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <div>
                  <div className="font-semibold break-words">
                    {s.name} ({s.code})
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {s.attended}/{s.totalClasses} classes | {s.labAttended}/
                    {s.labTotal} labs
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      update(s.id, {
                        attended: s.attended + 1,
                        totalClasses: s.totalClasses + 1,
                      })
                    }
                    className="px-2 sm:px-3 py-1 rounded-md bg-green-500 text-white text-xs sm:text-sm"
                  >
                    + Attended
                  </button>
                  <button
                    onClick={() =>
                      update(s.id, { totalClasses: s.totalClasses + 1 })
                    }
                    className="px-2 sm:px-3 py-1 rounded-md bg-red-500 text-white text-xs sm:text-sm"
                  >
                    + Missed
                  </button>
                  <button
                    onClick={() => {
                      setForm(s);
                      setEditingId(s.id);
                      setShowModal(true);
                    }}
                    className="px-2 sm:px-3 py-1 rounded-md bg-yellow-500 text-white text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Progress bars */}
              <div className="mt-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="w-full sm:w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-3 rounded-full transition-all ${
                        pct < 75 ? "bg-red-500" : "bg-indigo-500"
                      }`}
                    ></div>
                  </div>
                  <div className="text-sm font-medium text-center sm:text-right">
                    {pct}% Theory
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="w-full sm:w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      style={{ width: `${labPct}%` }}
                      className={`h-3 rounded-full transition-all ${
                        labPct < 75 ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></div>
                  </div>
                  <div className="text-sm font-medium text-center sm:text-right">
                    {labPct}% Lab
                  </div>
                </div>
              </div>

              {/* Delete button */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => del(s.id)}
                  className="px-3 py-1 rounded-md border text-xs sm:text-sm"
                >
                  Delete
                </button>
              </div>
            </SpotCard>
          );
        })}
      </div>

      {/* Add button always visible */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-6 py-2 rounded-md bg-indigo-600 text-white w-full sm:w-auto"
        >
          Add Subject
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Subject" : "Add Subject"}
            </h2>

            <div className="space-y-3">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm"
                placeholder="Subject name"
              />
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm"
                placeholder="Subject code"
              />
              <input
                type="number"
                value={form.totalClasses}
                onChange={(e) =>
                  setForm({ ...form, totalClasses: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm"
                placeholder="Total theory classes"
              />
              <input
                type="number"
                value={form.attended}
                onChange={(e) =>
                  setForm({ ...form, attended: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm"
                placeholder="Attended theory classes"
              />
              <input
                type="number"
                value={form.labTotal}
                onChange={(e) =>
                  setForm({ ...form, labTotal: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm"
                placeholder="Total lab classes"
              />
              <input
                type="number"
                value={form.labAttended}
                onChange={(e) =>
                  setForm({ ...form, labAttended: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm"
                placeholder="Attended lab classes"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 rounded-md border border-gray-500 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={addOrUpdate}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white w-full sm:w-auto"
              >
                {editingId ? "Save Changes" : "Add Subject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
