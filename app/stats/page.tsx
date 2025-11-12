import { Header } from "@/components/header"
import { StatsBoard } from "@/components/stats-board"

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <StatsBoard />
      </main>
    </div>
  )
}
