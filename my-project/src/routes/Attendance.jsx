import React, { useEffect } from "react";
import SpotCard from "../components/SpotCard";
import { load } from "../utils/storage";
import { Bar } from "react-chartjs-2";

export default function Attendance() {
  const subjects = load("subjects", []);

  // Bar chart data
  const barData = {
    labels: subjects.map((s) => s.name),
    datasets: [
      {
        label: "% Attendance",
        data: subjects.map((s) =>
          Math.round((s.attended / s.totalClasses) * 100 || 0)
        ),
        backgroundColor: "#4f46e5",
        borderRadius: 4,
      },
    ],
  };

  // Chart alert for <75%
  useEffect(() => {
    const lowSubjects = subjects.filter((s) => {
      const pct =
        s.totalClasses === 0
          ? 0
          : Math.round((s.attended / s.totalClasses) * 100);
      return pct < 75;
    });
    if (lowSubjects.length > 0) {
      alert(
        `⚠️ Warning: Your attendance is below 75% in: ${lowSubjects
          .map((s) => s.name)
          .join(", ")}`
      );
    }
  }, [subjects]);

  return (
    <div className="space-y-6">
      {/* Chart */}
      <SpotCard>
        <h2 className="text-lg sm:text-xl font-medium mb-4">Attendance Trends</h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px] h-64 sm:h-72 md:h-80">
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
        </div>
      </SpotCard>

      {/* Subject cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((s) => {
          const pct =
            s.totalClasses === 0
              ? 0
              : Math.round((s.attended / s.totalClasses) * 100);
          const low = pct < 75;

          return (
            <SpotCard
              key={s.id}
              className="flex flex-col justify-between p-4 min-w-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div className="truncate">
                  <div className="text-sm sm:text-base font-medium break-words">
                    {s.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {s.attended}/{s.totalClasses} classes
                  </div>
                </div>
                {low && (
                  <div className="text-red-500 font-semibold text-xs sm:text-sm">
                    ⚠️ Low
                  </div>
                )}
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  style={{ width: `${pct}%` }}
                  className={`h-3 rounded-full transition-all ${
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
