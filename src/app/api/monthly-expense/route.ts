import { NextResponse } from "next/server";
import connectDb from "../../../lib/connectDb";
import TransactionModel from "@/model/transactionModel";

export async function GET() {
  try {
    await connectDb();

    // Aggregate monthly totals from transactions collection
    const expenses = await TransactionModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } }, // Group by year-month string like "2025-05"
          total: { $sum: "$amount" }, // Sum amounts per month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month ascending
      },
    ]);

    // Map to the expected shape: { month: string, total: number }
    const monthlyExpenses = expenses.map((e) => ({
      month: e._id,
      total: e.total,
    }));

    return NextResponse.json(monthlyExpenses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch monthly expenses",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
