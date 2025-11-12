import Link from "next/link"
import { Gamepad2, BarChart3, MessageSquare } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">GameTracker</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Gamepad2 className="h-5 w-5" />
              <span className="font-medium">Biblioteca</span>
            </Link>
            <Link
              href="/reviews"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="font-medium">Reseñas</span>
            </Link>
            <Link
              href="/stats"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Estadísticas</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
