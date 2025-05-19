"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BudgetComparisonData {
  category: string;
  budget: number;
  actual: number;
}

interface BudgetComparisonChartProps {
  data: BudgetComparisonData[];
}

export default function BudgetComparisonChart({ data }: BudgetComparisonChartProps) {
  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        label: "Budget",
        data: data.map(d => d.budget),
        backgroundColor: "#A78BFA",
      },
      {
        label: "Actual",
        data: data.map(d => d.actual),
        backgroundColor: "#F87171",
      },
    ],
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Budget vs Actual</h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
}
