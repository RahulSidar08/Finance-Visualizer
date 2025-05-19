import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface Budget {
  percentageUsed: number;
}

interface SummaryCardsProps {
  total: number;
  transactions: any;
  topCategory: string;
  budget: Budget;
}

export default function SummaryCards({
  total,
  transactions,
  topCategory,
  budget,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <CardTitle>Total Expenses</CardTitle>
          <p className="text-2xl font-bold">₹{total}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <CardTitle>Transactions</CardTitle>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <CardTitle>Top Category</CardTitle>
          <p className="text-2xl font-bold">{topCategory}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <CardTitle>Budget Used</CardTitle>
          <p className="text-2xl font-bold">{budget.percentageUsed}%</p>
        </CardContent>
      </Card>
    </div>
  );
}
