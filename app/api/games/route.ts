import { NextResponse } from 'next/server';

// Mock data - En producción, esto vendría de tu backend Express + MongoDB
const mockGames = [
  {
    _id: '1',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Nintendo Switch',
    genre: 'Aventura',
    coverImage: '/zelda-tears-of-kingdom-game-cover.jpg',
    rating: 5,
    status: 'completed',
    hoursPlayed: 120,
  },
  {
    _id: '2',
    title: 'Elden Ring',
    platform: 'PlayStation 5',
    genre: 'RPG',
    coverImage: '/generic-fantasy-game-cover.png',
    rating: 5,
    status: 'playing',
    hoursPlayed: 85,
  },
  {
    _id: '3',
    title: "Baldur's Gate 3",
    platform: 'PC',
    genre: 'RPG',
    coverImage: '/baldurs-gate-3-inspired-cover.png',
    rating: 4,
    status: 'playing',
    hoursPlayed: 60,
  },
];

export async function GET() {
  return NextResponse.json(mockGames);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newGame = {
    ...data,
    _id: Date.now().toString(),
  };
  mockGames.push(newGame);
  return NextResponse.json(newGame, { status: 201 });
}
