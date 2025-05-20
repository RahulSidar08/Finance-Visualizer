import { NextRequest } from "next/server";
import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;
    const transaction = await TransactionModel.findById(id);

    if (!transaction) {
      return new Response("Transaction not found", { status: 404 });
    }

    return new Response(JSON.stringify(transaction), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/get-transaction/[id] error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
