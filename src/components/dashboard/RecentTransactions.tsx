import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface Transaction {
    _id: string;
    amount: number;
    description: string;
    category: string;
    date: string;
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    return format(date, "dd MMM yyyy");
}

export default function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
    return (
        <Card className="bg-gray-900 text-white">
            <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-4">Recent Transactions</CardTitle>
                {transactions.length === 0 ? (
                    <p className="text-muted-foreground">No recent transactions.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Amount (₹)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.slice(0, 5).map((tx) => (
                                <TableRow key={tx._id}>
                                    <TableCell>{formatDate(tx.date)}</TableCell>
                                    <TableCell>{tx.description}</TableCell>
                                    <TableCell>{tx.category}</TableCell>
                                    <TableCell className="text-right text-red-600 font-medium">₹{tx.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
