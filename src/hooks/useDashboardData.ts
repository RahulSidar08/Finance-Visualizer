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

function normalizeTransaction(tx: any): Transaction | null {
    if (!tx) return null;
    const _id = tx._id || tx.id || "";
    const amount = typeof tx.amount === "string" ? parseFloat(tx.amount) : tx.amount;
    const description = tx.description || "";
    const category = tx.category || "Uncategorized";
    const date = tx.date || "";

    if (!_id || isNaN(amount) || !description || !category || !date) return null;

    return { _id, amount, description, category, date };
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
                    .map(normalizeTransaction)
                    .filter((tx: any): tx is Transaction => tx !== null);

                const recentTransactions = (recentTransactionsRes.data.transactions || [])
                    .map(normalizeTransaction)
                    .filter((tx: any): tx is Transaction => tx !== null);

                const categoryTotals: Record<string, number> = {};
                transactions.forEach(({ amount, category }: any) => {
                    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
                });
                const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

                const totalBudget = Array.isArray(budgetRes.data?.budgets)
                    ? budgetRes.data.budgets.reduce((sum: number, b: any) => sum + b.amount, 0)
                    : 0;

                const totalSpent = transactions.reduce((sum: number, t: Transaction) => sum + t.amount, 0);

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
            } catch (err: any) {
                setError(err.message || "Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { ...data, loading, error };
}
