import Link from "next/link"

export default function Navbar() {

    return <>
        <nav className="w-full flex justify-between shadow-2xl text-2xl p-3">

            <div>
                <Link href="/">Finance Visualizer</Link>
            </div>
            <div className="flex space-x-4 text-blue-600 underline">
                <Link href="/view" > View </Link>
                <Link href="/add" > Add </Link>
                <Link href="/dashboard" >Dashboard</Link>
            </div>
        </nav>
    </>
}