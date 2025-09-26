import React, { useState } from "react";
import SpotCard from "../components/SpotCard";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { load } from "../utils/storage";
import jsPDF from "jspdf";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function calcOverall(subjects) {
  let total = 0,
    attended = 0;
  subjects.forEach((s) => {
    total += s.totalClasses;
    attended += s.attended;
  });
  const pct = total === 0 ? 0 : Math.round((attended / total) * 100);
  return { total, attended, pct };
}

export default function Dashboard() {
  const subjects = load("subjects", []);
  const exams = load("exams", []);

  const overall = calcOverall(subjects);

  const doughnutData = {
    labels: ["Attended", "Missed"],
    datasets: [
      {
        data: [overall.attended, overall.total - overall.attended],
        backgroundColor: ["#60a5fa", "#f87171"], // keep blue/red
      },
    ],
  };

  const barData = {
    labels: subjects.map((s) => s.name),
    datasets: [
      {
        label: "Attendance %",
        data: subjects.map((s) =>
          Math.round((s.attended / s.totalClasses) * 100 || 0)
        ),
        backgroundColor: "#60a5fa",
        barThickness: 24,
        borderRadius: 4,
      },
    ],
  };

  const [missInput, setMissInput] = useState(0);
  const simulatedPct =
    overall.total === 0
      ? 0
      : Math.max(
          0,
          Math.round(((overall.attended - missInput) / overall.total) * 100)
        );

  const upcomingExams = exams
    .filter((ex) => new Date(ex.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("My Attendance & Exam Report", 10, 10);

    doc.setFontSize(14);
    doc.text("Subjects:", 10, 20);
    subjects.forEach((s, idx) => {
      doc.text(
        `${idx + 1}. ${s.name} (${s.attended}/${s.totalClasses} classes)`,
        10,
        30 + idx * 7
      );
    });

    const startY = 30 + subjects.length * 7 + 10;
    doc.setFontSize(14);
    doc.text("Exams:", 10, startY);
    exams.forEach((e, idx) => {
      doc.text(
        `${idx + 1}. ${e.subject} (${e.type || "Exam"}) - ${new Date(
          e.date
        ).toLocaleDateString()}`,
        10,
        startY + 10 + idx * 7
      );
    });

    doc.save("MyDashboardReport.pdf");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Overall Attendance */}
      <SpotCard className="col-span-1">
        <h2 className="text-lg sm:text-xl font-medium mb-2">Overall Attendance</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-40 max-w-[200px]">
            <Doughnut data={doughnutData} />
          </div>
          <div className="text-center sm:text-left">
            <div className="text-3xl font-bold">{overall.pct}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {overall.attended}/{overall.total} classes
            </div>
          </div>
        </div>
      </SpotCard>

      {/* Subject-wise Attendance */}
      <SpotCard className="col-span-1 sm:col-span-2 lg:col-span-2">
        <h2 className="text-lg sm:text-xl font-medium mb-2">Subject-wise Attendance</h2>
        <div className="w-full h-64 sm:h-72 md:h-80 overflow-x-auto">
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, max: 100 },
                x: { ticks: { autoSkip: false } },
              },
              barPercentage: 0.6,
              categoryPercentage: 0.7,
            }}
          />
        </div>
      </SpotCard>

      {/* Upcoming Exams */}
      <SpotCard className="col-span-1 sm:col-span-2 lg:col-span-3">
        <h2 className="text-lg sm:text-xl font-medium mb-2">Upcoming Exams</h2>
        {upcomingExams.length === 0 ? (
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            No upcoming exams. Add some in the Exams page.
          </p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {upcomingExams.map((ex) => (
              <li
                key={ex.id}
                className="flex flex-col sm:flex-row justify-between sm:items-center py-2 gap-2"
              >
                <div>
                  <div className="font-semibold">{ex.subject} ({ex.code || "No code"})</div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {ex.type || "Exam"} | {ex.syllabus?.length || 0} chapters
                  </div>
                </div>
                <div className="text-right text-sm sm:text-base">
                  <div>{new Date(ex.date).toLocaleDateString()}</div>
                  <div className="text-gray-400">
                    {Math.max(
                      0,
                      Math.ceil((new Date(ex.date) - new Date()) / (1000 * 60 * 60 * 24))
                    )} days left
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SpotCard>

      {/* What-if Missed Classes */}
      <SpotCard className="col-span-1">
        <h2 className="text-lg sm:text-xl font-medium mb-2">What if I Miss Classes?</h2>
        <input
          type="number"
          min={0}
          value={missInput}
          onChange={(e) => setMissInput(Number(e.target.value))}
          placeholder="Number of classes to miss"
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 mb-2"
        />
        <p className="text-sm sm:text-base">
          If you miss <strong>{missInput}</strong> classes, your overall
          attendance will drop to <strong>{simulatedPct}%</strong>.
        </p>
      </SpotCard>

      {/* Export & Upload */}
      <SpotCard className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-lg sm:text-xl font-medium mb-2">Export & Upload</h2>
        <button
          onClick={exportPDF}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white w-full sm:w-990/992 hover:bg-indigo-700 transition-colors"
        >
          Export Dashboard PDF
        </button>
        <div>
          <label className="block mb-1 text-sm sm:text-base">Upload Resume / CV:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full text-sm sm:text-base text-gray-200 bg-gray-800 border border-gray-600 rounded-md p-2"
          />
        </div>
      </SpotCard>
    </div>
  );
}
