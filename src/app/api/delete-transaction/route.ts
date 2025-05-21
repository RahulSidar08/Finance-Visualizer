import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = context.params;

    const transaction = await TransactionModel.findByIdAndDelete(id);

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete transaction",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
