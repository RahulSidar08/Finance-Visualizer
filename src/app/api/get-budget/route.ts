// app/api/get-budget/route.ts
import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Budget from "@/model/BudgetModel";

export async function GET(request: Request) {
  try {
    await connectDb();

    // Fetch all budget entries (category-wise)
    const budgets = await Budget.find({}, { _id: 0, category: 1, amount: 1 });

    if (!budgets || budgets.length === 0) {
      return NextResponse.json(
        { success: false, message: "No budgets found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, budgets }, { status: 200 });
  } catch (error) {
    console.error("Failed to get budget:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get budget",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
