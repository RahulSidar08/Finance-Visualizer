import Link from "next/link";
import Image from "next/image";

export default function Home() {

  return (
    <>
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-bold text-blue-500">Welcome to Finance Visualizer</h1>
        <p className="text-lg text-gray-300">
          Track your expenses, visualize your spending, and take control of your financial life —
          all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white text-lg shadow-md">
              Go to Dashboard
            </button>
          </Link>
          <Link href="/add">
            <button className="bg-gray-800 hover:bg-gray-700 transition px-6 py-3 rounded-xl text-white text-lg shadow-md">
              Add Transaction
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
