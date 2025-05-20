"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const categories = [
  "Food",
  "Rent",
  "Travel",
  "Shopping",
  "Entertainment",
  "Utilities",
  "Other",
];

export default function Page() {
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/add-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, date, description, category }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Transaction Added Successfully!");
        setAmount(0);
        setDate("");
        setDescription("");
        setCategory(categories[0]);
      } else {
        setMessage(data.message || "Failed to add transaction");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md flex flex-col space-y-10 shadow-2xl rounded-2xl p-6">
        <h1 className="text-center font-semibold text-xl">
          Add Your Financial Details here
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Amount */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="amount">Enter Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter Amount"
              className="w-full px-2 py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              value={amount === null ? "" : amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? null : Number(e.target.value))
              }
              required
            />
          </div>

          {/* Date */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className="w-full px-2 py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="description">Add Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter your Description here...."
              className="w-full px-2 py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Category (shadcn/ui Select) */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="category" className="mb-1">
              Category
            </label>
            <Select
              onValueChange={(value) => setCategory(value)}
              value={category}
              defaultValue={categories[0]}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-black hover:bg-black text-white">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 px-2 py-3 rounded-full hover:bg-blue-800 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm font-medium mt-2">{message}</p>
        )}
      </div>
    </div>
  );
}
