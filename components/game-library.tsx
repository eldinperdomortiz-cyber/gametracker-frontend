'use client';

import { useState, useEffect } from 'react';
import { GameCard } from './game-card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Gamepad2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AddGameDialog } from './add-game-dialog';

interface Game {
  _id: string;
  title: string;
  platform: string;
  genre: string;
  coverImage?: string;
  rating: number;
  status: 'playing' | 'completed' | 'backlog' | 'wishlist';
  hoursPlayed: number;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export function GameLibrary() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedFilter, games]);

  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_URL}/api/games`);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const filterGames = () => {
    let filtered = games;

    if (searchQuery) {
      filtered = filtered.filter(
        (game) => game.title.toLowerCase().includes(searchQuery.toLowerCase()) || game.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter !== 'all') {
      filtered = filtered.filter((game) => game.status === selectedFilter);
    }

    setFilteredGames(filtered);
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-4xl font-bold text-balance'>Mi Biblioteca</h1>
          <p className='text-muted-foreground mt-2'>
            {games.length} {games.length === 1 ? 'juego' : 'juegos'} en tu colección
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className='bg-primary text-primary-foreground hover:bg-primary/90'>
          <Plus className='h-5 w-5 mr-2' />
          Agregar Juego
        </Button>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
          <Input
            type='text'
            placeholder='Buscar por título o género...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-10 bg-card border-border'
          />
        </div>

        <div className='flex gap-2 overflow-x-auto pb-2'>
          {['all', 'playing', 'completed', 'backlog', 'wishlist'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              onClick={() => setSelectedFilter(filter)}
              className='whitespace-nowrap'
            >
              {filter === 'all'
                ? 'Todos'
                : filter === 'playing'
                ? 'Jugando'
                : filter === 'completed'
                ? 'Completados'
                : filter === 'backlog'
                ? 'Pendientes'
                : 'Deseados'}
            </Button>
          ))}
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <Gamepad2 className='h-16 w-16 text-muted-foreground mb-4' />
          <h3 className='text-xl font-semibold mb-2'>No hay juegos aquí</h3>
          <p className='text-muted-foreground mb-6'>
            {searchQuery ? 'No se encontraron juegos con esos criterios' : 'Comienza agregando tu primer juego a la biblioteca'}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className='h-5 w-5 mr-2' />
              Agregar tu primer juego
            </Button>
          )}
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredGames.map((game) => (
            <GameCard key={game._id} game={game} onUpdate={fetchGames} />
          ))}
        </div>
      )}

      <AddGameDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSuccess={fetchGames} />
    </div>
  );
}
