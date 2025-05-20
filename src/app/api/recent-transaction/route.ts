// app/api/get-transaction/route.ts (or pages/api/get-transaction.ts if using pages dir)
import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb"; // your mongoose connect utility
import TransactionModel from "@/model/transactionModel";

export async function GET() {
  try {
    await connectDb();
    const transactions = await TransactionModel.find().sort({ date: -1 }).limit(10); // latest 10 transactions

    return NextResponse.json({ success: true, transactions }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
