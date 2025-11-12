import { NextResponse } from "next/server"

export async function GET() {
  // Mock statistics - En producción calcularías esto desde MongoDB
  const stats = {
    totalGames: 12,
    totalHours: 385,
    averageRating: 4.3,
    completedGames: 5,
    byStatus: {
      playing: 3,
      completed: 5,
      backlog: 3,
      wishlist: 1,
    },
    byGenre: [
      { genre: "RPG", count: 5 },
      { genre: "Aventura", count: 3 },
      { genre: "Acción", count: 2 },
      { genre: "Estrategia", count: 1 },
      { genre: "Indie", count: 1 },
    ],
    topRated: [
      { title: "The Legend of Zelda: Tears of the Kingdom", rating: 5 },
      { title: "Elden Ring", rating: 5 },
      { title: "Baldur's Gate 3", rating: 4 },
    ],
  }

  return NextResponse.json(stats)
}
