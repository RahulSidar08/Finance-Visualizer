import mongoose, { Document, Schema } from "mongoose";

export interface Transaction extends Document {
    amount: Number;
    date: Date;
    description: string;
}

const transactionSchema: Schema<Transaction> = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const TransactionModel = (mongoose.models.Transaction as mongoose.Model<Transaction>) ||
    mongoose.model<Transaction>('Transaction', transactionSchema);

export default TransactionModel;
