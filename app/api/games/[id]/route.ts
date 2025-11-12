import { NextResponse } from "next/server"

// Mock data store
const mockGamesStore = new Map()

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  const id = params.id

  mockGamesStore.set(id, { ...data, _id: id })

  return NextResponse.json({ ...data, _id: id })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  mockGamesStore.delete(id)

  return NextResponse.json({ success: true })
}
