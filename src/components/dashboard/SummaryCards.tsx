import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface Budget {
  percentageUsed: number;
}

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}


interface SummaryCardsProps {
  total: number;
  transactions: Transaction[];
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
    <>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-black text-white ">
        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <CardTitle>Total Expenses</CardTitle>
            <p className="text-2xl font-bold">₹{total}</p>
          </CardContent>
        </Card>
        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <CardTitle>Transactions</CardTitle>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <CardTitle>Top Category</CardTitle>
            <p className="text-2xl font-bold">{topCategory}</p>
          </CardContent>
        </Card>
        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <CardTitle>Budget Used</CardTitle>
            <p className="text-2xl font-bold">${budget.percentageUsed.toFixed(3)}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full mt-32 px-10flex flex-col space-y-20">
        <h2 className="text-4xl text-center font-extrabold text-white mb-4 tracking-wide">
          Financial Summary
        </h2>
        <p className="text-lg text-gray-300 max-w-6xl leading-relaxed">
          Get a concise overview of your financial performance this month.
          Keep an eye on your <span className="text-indigo-400 font-semibold">total expenses</span>,
          analyze <span className="text-indigo-400 font-semibold">transaction frequency</span>,
          spot your <span className="text-indigo-400 font-semibold">highest spending category</span>,
          and stay informed about your <span className="text-indigo-400 font-semibold">budget usage</span>.
          Make smarter money decisions with real-time insights.
        </p>
      </div>
    </>

  );
}
