import mongoose, { Document, Schema } from "mongoose";

export interface Transaction extends Document {
  amount: number;
  date: Date;
  description: string;
  category: string; 
}

const transactionSchema: Schema<Transaction> = new mongoose.Schema(
  {
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
    category: {
      type: String,
      required: true, 
      enum: ["Food", "Rent", "Travel", "Shopping", "Entertainment", "Utilities", "Other"], // optional: restrict to predefined categories
    },
  },
  {
    timestamps: true,
  }
);

const TransactionModel =
  (mongoose.models.Transaction as mongoose.Model<Transaction>) ||
  mongoose.model<Transaction>("Transaction", transactionSchema);

export default TransactionModel;
