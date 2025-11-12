import { Header } from "@/components/header"
import { ReviewsList } from "@/components/reviews-list"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ReviewsList />
      </main>
    </div>
  )
}
