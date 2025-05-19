"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react"; // or any 3-dot icon you prefer
import { useRouter } from "next/navigation";

export default function Transactions() {
    const [transactionData, setTransactionData] = useState<any[]>([]);
    const router = useRouter()
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("/api/get-transaction", {
                    withCredentials: true,
                });
                console.log(res)
                setTransactionData(res.data.transactions);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };
        getData();
    }, []);

    // Handlers for edit and delete (to be implemented)
    const handleEdit = (id: string) => {
        router.push(`/view/${id}`)
    };
    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(`/api/delete-transaction/${id}`, {
                withCredentials: true, // optional if your API requires auth cookies
            });

            if (res.data.success) {
                console.log("Transaction deleted successfully");
                // Optionally update UI after deletion
                setTransactionData((prev: any[]) => prev.filter(txn => txn._id !== id));
            } else {
                console.warn("Failed to delete transaction:", res.data.message);
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };


    return (
        <div className="mt-20">
            <h1 className="mb-4 text-2xl font-bold text-center">All Transactions</h1>
            <div className=" w-full p-10">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount (Rs.)</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(transactionData) && transactionData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No transactions found.
                                </TableCell>
                            </TableRow>
                        )}

                        {Array.isArray(transactionData) && transactionData.map((txn) => (
                            <TableRow key={txn._id}>
                                <TableCell>
                                    {new Date(txn.date).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </TableCell>
                                <TableCell>{txn.description}</TableCell>
                                <TableCell>{txn.amount}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-24 p-0">
                                            <button
                                                onClick={() => handleEdit(txn._id)}
                                                className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(txn._id)}
                                                className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Delete
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
