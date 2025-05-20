import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBudget extends Document {
  category: string;
  amount: number;
}

const BudgetSchema: Schema<IBudget> = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

// Avoid model overwrite error in Next.js hot reload
const Budget: Model<IBudget> =
  mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;
