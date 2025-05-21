import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";
import { NextRequest, NextResponse } from "next/server";

// Updated handler signature for Next.js 15+
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params Promise
    await connectDb();

    const transaction = await TransactionModel.findById(id);

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Transaction fetched successfully",
        transaction,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transaction",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
