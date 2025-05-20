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
        <div className="flex-1 h-screen bg-black flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">Category Breakdown</h2>
                <div className="h-96">
                    <Pie data={chartData} />
                </div>
            </div>
        </div>
    );
}
