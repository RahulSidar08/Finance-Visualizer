import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";

export async function GET() {
  try {
    await connectDb();

    const data = await TransactionModel.aggregate([
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          amount: 1,
        },
      },
    ]);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Category expense aggregation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch category expenses",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
