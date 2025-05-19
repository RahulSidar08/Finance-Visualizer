"use client";

import { useState } from "react";

import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import BudgetComparisonChart from "@/components/dashboard/BudgetComparisonChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardLayout() {
  // Simple state to track active page
  const [activeTab, setActiveTab] = useState("summary");

  // Dummy data for demo - replace with your actual data or fetch logic
  const dummyTransactions = [
    {
      _id: "1",
      amount: 500,
      description: "Groceries",
      category: "Food",
      date: "2025-05-01",
    },
    {
      _id: "2",
      amount: 1500,
      description: "Rent",
      category: "Housing",
      date: "2025-05-03",
    },
    // Add more as needed
  ];

  const dummyCategoryData = [
    { category: "Food", amount: 1200 },
    { category: "Housing", amount: 2500 },
    { category: "Transport", amount: 600 },
  ];

  const dummyBudgetData = [
    { category: "Food", budget: 1500, actual: 1200 },
    { category: "Housing", budget: 3000, actual: 2500 },
    { category: "Transport", budget: 700, actual: 600 },
  ];

  const totalExpenses = dummyTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const topCategory = dummyCategoryData.reduce((max, item) =>
    item.amount > max.amount ? item : max
  ).category;

  const budgetUsage = {
    percentageUsed: Math.round(
      (dummyTransactions.reduce((sum, tx) => sum + tx.amount, 0) /
        dummyBudgetData.reduce((sum, b) => sum + b.budget, 0)) *
        100
    ),
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold mb-6">Finance Dashboard</h1>
        <button
          className={`text-left px-3 py-2 rounded ${
            activeTab === "summary" ? "bg-indigo-600" : "hover:bg-indigo-700"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Summary
        </button>
        <button
          className={`text-left px-3 py-2 rounded ${
            activeTab === "monthly" ? "bg-indigo-600" : "hover:bg-indigo-700"
          }`}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly Expenses
        </button>
        <button
          className={`text-left px-3 py-2 rounded ${
            activeTab === "categories" ? "bg-indigo-600" : "hover:bg-indigo-700"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
        <button
          className={`text-left px-3 py-2 rounded ${
            activeTab === "budget" ? "bg-indigo-600" : "hover:bg-indigo-700"
          }`}
          onClick={() => setActiveTab("budget")}
        >
          Budget Comparison
        </button>
        <button
          className={`text-left px-3 py-2 rounded ${
            activeTab === "recent" ? "bg-indigo-600" : "hover:bg-indigo-700"
          }`}
          onClick={() => setActiveTab("recent")}
        >
          Recent Transactions
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-auto">
        {activeTab === "summary" && (
          <SummaryCards
            total={totalExpenses}
            transactions={dummyTransactions}
            topCategory={topCategory}
            budget={budgetUsage}
          />
        )}
        {activeTab === "monthly" && <MonthlyBarChart data={[
          { month: "Jan", total: 1200 },
          { month: "Feb", total: 900 },
          { month: "Mar", total: 1500 },
          { month: "Apr", total: 1100 },
          { month: "May", total: 1800 },
        ]} />}
        {activeTab === "categories" && <CategoryPieChart data={dummyCategoryData} />}
        {activeTab === "budget" && <BudgetComparisonChart data={dummyBudgetData} />}
        {activeTab === "recent" && <RecentTransactions transactions={dummyTransactions} />}
      </main>
    </div>
  );
}
