import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const transactions = await TransactionModel.find();

    if (transactions.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No transactions found",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Transactions fetched successfully",
        transactions, // fixed typo: was 'transactios'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch data",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
