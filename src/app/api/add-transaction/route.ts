
import { NextResponse } from "next/server";
import connectDb from "../../../lib/connectDb"
import TransactionModel from "@/model/transactionModel";


export async function POST(request: Request) {
  try {
    await connectDb();
    let { amount, date, description, category } = await request.json();
    console.log(amount, date, description, category);

    const newTransaction = await TransactionModel.create({
      amount,
      date: new Date(date),
      description,
      category, // include category here
    });

    return NextResponse.json(
      {
        success: true,
        message: "Transaction Added Successfully",
        newTransaction,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to Add Transaction",
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      }
    );
  }
}
