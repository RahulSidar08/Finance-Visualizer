import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import BudgetComparisonChart from "@/components/dashboard/BudgetComparisonChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardPage() {
  // Replace with real data fetching
  const dummyData = {
    total: 12450,
    transactions: [{}, {}, {}],
    topCategory: "Groceries",
    budget: { percentageUsed: 72 },
    monthlyData: [{ month: "Jan", total: 3000 }, { month: "Feb", total: 4000 }],
    categoryData: [
      { category: "Groceries", amount: 3000 },
      { category: "Transport", amount: 2000 },
    ],
    budgetData: [
      { category: "Groceries", budget: 4000, actual: 3000 },
      { category: "Transport", budget: 3000, actual: 2000 },
    ],
  };

  return (
    
    <div className="p-6 space-y-8">
      <SummaryCards {...dummyData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyBarChart data={dummyData.monthlyData} />
        <CategoryPieChart data={dummyData.categoryData} />
      </div>
      <BudgetComparisonChart data={dummyData.budgetData} />
      <RecentTransactions transactions={dummyData.transactions} />
    </div>
  );
}
