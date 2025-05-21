"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Transaction {
    _id: string;
    amount: number;
    description: string;
    category: string;
    date: string;
}

export interface Budget {
    percentageUsed: number;
}

export interface MonthlyExpense {
    month: string;
    total: number;
}

export interface CategoryData {
    category: string;
    amount: number;
}

export interface BudgetComparisonData {
    category: string;
    budget: number;
    actual: number;
}

interface BudgetItem {
    amount: number;
    [key: string]: unknown;
}

function normalizeTransaction(tx: unknown): Transaction | null {
    if (!tx || typeof tx !== "object") return null;
    const obj = tx as Partial<Transaction> & { [key: string]: unknown };

    const _id = typeof obj._id === "string" ? obj._id : (typeof obj.id === "string" ? obj.id : "");
    const amount = typeof obj.amount === "string" ? parseFloat(obj.amount) : obj.amount;
    const description = typeof obj.description === "string" ? obj.description : "";
    const category = typeof obj.category === "string" ? obj.category : "Uncategorized";
    const date = typeof obj.date === "string" ? obj.date : "";

    if (!_id || isNaN(amount as number) || !description || !category || !date) return null;

    return { _id, amount: amount as number, description, category, date };
}

export function useDashboardData() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{
        total: number;
        transactions: Transaction[];
        topCategory: string;
        budget: Budget;
        monthlyData: MonthlyExpense[];
        categoryData: CategoryData[];
        budgetData: BudgetComparisonData[];
        recentTransactions: Transaction[];
    }>({
        total: 0,
        transactions: [],
        topCategory: "",
        budget: { percentageUsed: 0 },
        monthlyData: [],
        categoryData: [],
        budgetData: [],
        recentTransactions: [],
    });

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

                const transactions = (transactionsRes.data.transactions || [])
                    .map((tx: unknown) => normalizeTransaction(tx))
                    .filter((tx:Transaction): tx is Transaction => tx !== null);

                const recentTransactions = (recentTransactionsRes.data.transactions || [])
                    .map((tx: unknown) => normalizeTransaction(tx))
                    .filter((tx:Transaction): tx is Transaction => tx !== null);

                const categoryTotals: Record<string, number> = {};
                transactions.forEach(({ amount, category } : Transaction) => {
                    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
                });

                const topCategory =
                    Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

                const totalBudget = Array.isArray(budgetRes.data?.budgets)
                    ? budgetRes.data.budgets.reduce((sum: number, b: BudgetItem) => {
                          const amount = typeof b?.amount === "number" ? b.amount : 0;
                          return sum + amount;
                      }, 0)
                    : 0;

                const totalSpent = transactions.reduce((sum:number, t:Transaction) => sum + t.amount, 0);

                const percentageUsed = totalBudget ? (totalSpent / totalBudget) * 100 : 0;

                setData({
                    total: totalSpent,
                    transactions,
                    topCategory,
                    budget: { percentageUsed: Math.min(percentageUsed, 100) },
                    monthlyData: monthlyRes.data,
                    categoryData: categoryRes.data,
                    budgetData: comparisonRes.data,
                    recentTransactions,
                });
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to load dashboard data");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { ...data, loading, error };
}
