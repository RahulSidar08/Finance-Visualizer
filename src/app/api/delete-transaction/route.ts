import connectDb from "@/lib/connectDb";
import TransactionModel from "@/model/transactionModel";
import { NextResponse } from "next/server";

interface Context {
    params: {
        id: string;
    };
}


export async function DELETE( context: Context) {
    try {
        await connectDb();

        const { id } = await context.params;

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
