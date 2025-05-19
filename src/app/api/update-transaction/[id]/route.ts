import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";
import { NextResponse } from "next/server";


interface Context {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, context: Context) {
  try {
    await connectDb();
    const { id } = context.params;
    const { amount, date, description } = await request.json();

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

    // Update fields
    transaction.amount = amount;
    transaction.date = date;
    transaction.description = description;

    // Save the updated transaction
    await transaction.save();

    return NextResponse.json(
      {
        success: true,
        message: "Transaction updated successfully",
        transaction,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update transaction",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

