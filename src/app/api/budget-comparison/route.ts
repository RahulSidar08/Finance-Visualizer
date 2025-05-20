
import connectDb from "@/lib/connectDb";
import Budget from "@/model/BudgetModel";
import TransactionModel from "@/model/transactionModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    // Fetch all transactions
    const transactions = await TransactionModel.find();

    // Group actual expenses by category
    const actualsByCategory: Record<string, number> = {};
    transactions.forEach(txn => {
      actualsByCategory[txn.category] = (actualsByCategory[txn.category] || 0) + txn.amount;
    });

    // Fetch all budgets
    const budgets = await Budget.find();

    // Map category-wise comparison
    const comparison = budgets.map(budget => ({
      category: budget.category,
      budget: budget.amount,
      actual: actualsByCategory[budget.category] || 0,
    }));

    return NextResponse.json(comparison, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch budget comparison:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
