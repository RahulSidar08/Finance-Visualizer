"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryData {
  category: string;
  amount: number;
}

interface CategoryPieChartProps {
  data: CategoryData[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        data: data.map(d => d.amount),
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-md min-h-screen-[200px]  flex justify-center items-center">
      <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
      <Pie data={chartData} />
    </div>
  );
}
