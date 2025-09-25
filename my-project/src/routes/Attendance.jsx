import React from "react";
import SpotCard from "../components/SpotCard";
import { load } from "../utils/storage";
import { Bar } from "react-chartjs-2";

export default function Attendance() {
  const subjects = load("subjects", []);

  const barData = {
    labels: subjects.map((s) => s.name),
    datasets: [
      {
        label: "% Attendance",
        data: subjects.map((s) =>
          Math.round((s.attended / s.totalClasses) * 100 || 0)
        ),
        barThickness: 24,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <SpotCard>
        <h2 className="text-lg font-medium mb-2">Attendance Trends</h2>
        <div className="h-56">
          <Bar
            data={barData}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, max: 100 } },
            }}
          />
        </div>
      </SpotCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((s) => {
          const pct =
            s.totalClasses === 0
              ? 0
              : Math.round((s.attended / s.totalClasses) * 100);
          const low = pct < 75;
          return (
            <SpotCard key={s.id} className={`flex flex-col`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {s.attended}/{s.totalClasses} classes
                  </div>
                </div>
                {low && (
                  <div className="text-red-500 font-semibold">⚠️ Low</div>
                )}
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  style={{ width: `${pct}%` }}
                  className={`h-3 rounded-full ${
                    pct < 75 ? "bg-red-500" : "bg-indigo-500"
                  }`}
                ></div>
              </div>
            </SpotCard>
          );
        })}
      </div>
    </div>
  );
}
