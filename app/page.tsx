import { CodingProblemsDashboard } from "@/components/coding-problems-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Master the Code
        </h1>
        <p className="text-slate-300 mb-8">Search for companies to find their most frequently asked coding problems</p>
        <p className="text-slate-300 mb-8">Unlock the most frequently asked coding problems by top companies.</p>
        <CodingProblemsDashboard />
      </div>
    </main>
  )
}

