"use client";
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

interface Transaction {
    _id: string;
    amount: number;
    description: string;
    category: string;
    date: string;
}

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";
export default function EditTransactionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
      const [category, setCategory] = useState(categories[0]);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const res = await axios.get(`/api/get-transaction/${id}`);
                setTransaction(res.data);
                setAmount(res.data.amount);
                setDescription(res.data.description);
                setDate(res.data.date.split("T")[0]); // format date for input type=date
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`/api/update-transaction/${id}`, {
                amount,
                description,
                date,
                category
            });
            router.push("/view"); // redirect after edit
        } catch (err) {
            console.error(err);
            alert("Failed to update transaction");
        }
    };

    if (loading) return <p>Loading...</p>;

    if (!transaction) return <p>Transaction not found.</p>;

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Edit Transaction</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
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
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Update Transaction
                </button>
            </form>
        </div>
    );
}
