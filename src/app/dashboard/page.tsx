"use client";

import { useState } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import BudgetComparisonChart from "@/components/dashboard/BudgetComparisonChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("summary");

  const {
    total,
    transactions,
    topCategory,
    budget,
    monthlyData,
    categoryData,
    budgetData,
    recentTransactions,
    loading,
    error,
  } = useDashboardData();

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-black text-white p-6 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold mb-6">Finance Dashboard</h1>
        {["summary", "monthly", "categories", "budget", "recent"].map((tab) => (
          <button
            key={tab}
            className={`text-left px-3 py-2 rounded ${
              activeTab === tab ? "bg-indigo-600" : "hover:bg-indigo-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </aside>

      <main className="flex-1 bg-black text-white p-8 overflow-auto">
        {activeTab === "summary" && (
          <SummaryCards
            total={total}
            transactions={transactions}
            topCategory={topCategory}
            budget={budget}
          />
        )}
        {activeTab === "monthly" && <MonthlyBarChart data={monthlyData} />}
        {activeTab === "categories" && <CategoryPieChart data={categoryData} />}
        {activeTab === "budget" && <BudgetComparisonChart data={budgetData} />}
        {activeTab === "recent" && <RecentTransactions transactions={recentTransactions} />}
      </main>
    </div>
  );
}
