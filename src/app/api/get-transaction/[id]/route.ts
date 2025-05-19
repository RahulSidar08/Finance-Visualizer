import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";
import { NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: Request, context: Context) {
  try {
    await connectDb();
    const { id } = context.params;

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
