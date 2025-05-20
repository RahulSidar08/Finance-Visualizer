import Link from "next/link"

export default function Navbar() {

    return <>
        <nav className="w-full flex justify-between items-center bg-black shadow-2xl px-6 py-4 border-b border-gray-700">
            <div className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300">
                <Link href="/">Finance Visualizer</Link>
            </div>
            <div className="flex space-x-6 text-lg">
                <Link
                    href="/view"
                    className="text-gray-300 hover:text-blue-400  transition duration-300"
                >
                    View
                </Link>
                <Link
                    href="/add"
                    className="text-gray-300 hover:text-blue-400  transition duration-300"
                >
                    Add
                </Link>
                <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-blue-400  transition duration-300"
                >
                    Dashboard
                </Link>
            </div>
        </nav>


    </>
}