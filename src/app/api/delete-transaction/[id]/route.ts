import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";


export async function DELETE(request: NextRequest) {
  try {
    await connectDb();

    // Extract the 'id' from the URL
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    const transaction = await TransactionModel.findByIdAndDelete(id);

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Transaction deleted successfully" },
      { status: 200 }
    );
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


