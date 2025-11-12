import { NextResponse } from "next/server"

// Mock data
const mockReviews = [
  {
    _id: "1",
    gameId: "1",
    gameTitle: "The Legend of Zelda: Tears of the Kingdom",
    rating: 5,
    content:
      "Una obra maestra absoluta. Nintendo ha superado todas las expectativas con este juego. La libertad de exploración es incomparable, y cada rincón de Hyrule está lleno de secretos y sorpresas. Los nuevos poderes de Link añaden una capa de creatividad que transforma completamente la experiencia.",
    createdAt: "2024-11-15T10:30:00Z",
  },
  {
    _id: "2",
    gameId: "2",
    gameTitle: "Elden Ring",
    rating: 5,
    content:
      "FromSoftware ha creado su obra más ambiciosa. El mundo abierto es impresionante y está magistralmente diseñado. Cada jefe es un desafío único que requiere estrategia y habilidad. La historia es críptica pero fascinante para quienes se toman el tiempo de descifrarla.",
    createdAt: "2024-11-10T15:45:00Z",
  },
]

export async function GET() {
  return NextResponse.json(mockReviews)
}

export async function POST(request: Request) {
  const data = await request.json()
  const newReview = {
    ...data,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  mockReviews.push(newReview)
  return NextResponse.json(newReview, { status: 201 })
}
