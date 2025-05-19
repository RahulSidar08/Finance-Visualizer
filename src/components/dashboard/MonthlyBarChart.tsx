"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface MonthlyExpense {
  month: string;  // e.g. "Jan", "Feb", "Mar" or "2025-05"
  total: number;
}

interface MonthlyBarChartProps {
  data: MonthlyExpense[];
}

export default function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: "Expenses",
        data: data.map(d => d.total),
        backgroundColor: "#4F46E5",
      },
    ],
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <Bar 
        data={chartData} 
        options={{ 
          responsive: true, 
          plugins: { 
            legend: { display: false } 
          } 
        }} 
      />
    </div>
  );
}
