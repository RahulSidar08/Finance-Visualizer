"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import BudgetComparisonChart from "@/components/dashboard/BudgetComparisonChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface Budget {
  percentageUsed: number;
}

interface MonthlyExpense {
  month: string;
  total: number;
}

interface CategoryData {
  category: string;
  amount: number;
}

interface BudgetComparisonData {
  category: string;
  budget: number;
  actual: number;
}

function normalizeTransaction(tx: any): Transaction | null {
  // Basic validation and normalization of a transaction object
  if (!tx) return null;

  // Ensure required fields exist and correct types
  const _id = tx._id || tx.id || ""; // try id if _id not present
  const amount = typeof tx.amount === "string" ? parseFloat(tx.amount) : tx.amount;
  const description = tx.description || "";
  const category = tx.category || "Uncategorized";
  const date = tx.date || "";

  if (!_id || isNaN(amount) || !description || !category || !date) {
    console.warn("Skipping invalid transaction", tx);
    return null;
  }

  return {
    _id,
    amount,
    description,
    category,
    date,
  };
}

export default function DashboardLayout() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget>({ percentageUsed: 0 });
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([]);
  const [categoryExpenses, setCategoryExpenses] = useState<CategoryData[]>([]);
  const [budgetComparison, setBudgetComparison] = useState<BudgetComparisonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("summary");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [
          transactionsRes,
          budgetRes,
          monthlyRes,
          categoryRes,
          comparisonRes,
          recentTransactionsRes,
        ] = await Promise.all([
          axios.get("/api/get-transaction"),
          axios.get("/api/get-budget"),
          axios.get("/api/monthly-expense"),
          axios.get("/api/category-expense"),
          axios.get("/api/budget-comparison"),
          axios.get("/api/recent-transaction"),
        ]);

        // Validate and normalize transactions data
        const transactionsDataRaw = transactionsRes.data.transactions || [];
        const transactionsData = transactionsDataRaw
          .map(normalizeTransaction)
          .filter((tx:any): tx is Transaction => tx !== null);

        const budgetData = budgetRes.data;
        const monthlyData: MonthlyExpense[] = monthlyRes.data;
        const categoryData: CategoryData[] = categoryRes.data;
        const comparisonData: BudgetComparisonData[] = comparisonRes.data;

        // Normalize recent transactions with same function
        const recentTransactionsRaw = recentTransactionsRes.data.transactions || [];
        const recentTransactionsData = recentTransactionsRaw
          .map(normalizeTransaction)
          .filter((tx:any): tx is Transaction => tx !== null);

        console.log("Normalized recent transactions:", recentTransactionsData);

        // Calculate total budget and spent
        const totalBudget = Array.isArray(budgetData?.budgets)
          ? budgetData.budgets.reduce((sum: number, b: any) => sum + b.amount, 0)
          : 0;

        const totalSpent = transactionsData.reduce((sum: number, t: Transaction) => sum + t.amount, 0);
        const percentageUsed = totalBudget ? (totalSpent / totalBudget) * 100 : 0;

        setTransactions(transactionsData);
        setBudget({ percentageUsed: Math.min(percentageUsed, 100) }); // Clamp to 100%
        setMonthlyExpenses(monthlyData);
        setCategoryExpenses(categoryData);
        setBudgetComparison(comparisonData);
        setRecentTransactions(recentTransactionsData);
      } catch (err: any) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const total = transactions.reduce((sum, txn) => sum + txn.amount, 0);

  const categoryTotals: Record<string, number> = {};
  transactions.forEach(({ amount, category }) => {
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  const topCategory =
    Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold mb-6">Finance Dashboard</h1>
        {["summary", "monthly", "categories", "budget", "recent"].map((tab) => (
          <button
            key={tab}
            className={`text-left px-3 py-2 rounded ${
              activeTab === tab ? "bg-indigo-600" : "hover:bg-indigo-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-800 text-white p-8 overflow-auto">
        {activeTab === "summary" && (
          <SummaryCards
            total={total}
            transactions={transactions}
            topCategory={topCategory}
            budget={budget}
          />
        )}
        {activeTab === "monthly" && <MonthlyBarChart data={monthlyExpenses} />}
        {activeTab === "categories" && <CategoryPieChart data={categoryExpenses} />}
        {activeTab === "budget" && <BudgetComparisonChart data={budgetComparison} />}
        {activeTab === "recent" && <RecentTransactions transactions={recentTransactions} />}
      </main>
    </div>
  );
}
