'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Clock, Star, Trophy, TrendingUp } from 'lucide-react';

interface Stats {
  totalGames: number;
  totalHours: number;
  averageRating: number;
  completedGames: number;
  byStatus: {
    playing: number;
    completed: number;
    backlog: number;
    wishlist: number;
  };
  byGenre: Array<{ genre: string; count: number }>;
  topRated: Array<{ title: string; rating: number }>;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function StatsBoard() {
  const [stats, setStats] = useState<Stats>({
    totalGames: 0,
    totalHours: 0,
    averageRating: 0,
    completedGames: 0,
    byStatus: { playing: 0, completed: 0, backlog: 0, wishlist: 0 },
    byGenre: [],
    topRated: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-4xl font-bold text-balance mb-2'>Mis Estadísticas</h1>
        <p className='text-muted-foreground'>Un resumen de tu experiencia gaming</p>
      </div>

      {/* Main Stats */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='bg-card border-border'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Total de Juegos</CardTitle>
            <Gamepad2 className='h-5 w-5 text-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.totalGames}</div>
            <p className='text-xs text-muted-foreground mt-1'>En tu biblioteca</p>
          </CardContent>
        </Card>

        <Card className='bg-card border-border'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Horas Totales</CardTitle>
            <Clock className='h-5 w-5 text-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.totalHours}h</div>
            <p className='text-xs text-muted-foreground mt-1'>Jugadas</p>
          </CardContent>
        </Card>

        <Card className='bg-card border-border'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Rating Promedio</CardTitle>
            <Star className='h-5 w-5 text-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.averageRating.toFixed(1)} ⭐</div>
            <p className='text-xs text-muted-foreground mt-1'>De 5 estrellas</p>
          </CardContent>
        </Card>

        <Card className='bg-card border-border'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Completados</CardTitle>
            <Trophy className='h-5 w-5 text-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.completedGames}</div>
            <p className='text-xs text-muted-foreground mt-1'>Juegos terminados</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Status Breakdown */}
        <Card className='bg-card border-border'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-primary' />
              Estado de Juegos
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='h-3 w-3 rounded-full bg-primary' />
                  <span className='text-sm font-medium'>Jugando</span>
                </div>
                <span className='text-sm font-bold'>{stats.byStatus.playing}</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='h-3 w-3 rounded-full bg-green-500' />
                  <span className='text-sm font-medium'>Completados</span>
                </div>
                <span className='text-sm font-bold'>{stats.byStatus.completed}</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='h-3 w-3 rounded-full bg-yellow-500' />
                  <span className='text-sm font-medium'>Pendientes</span>
                </div>
                <span className='text-sm font-bold'>{stats.byStatus.backlog}</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='h-3 w-3 rounded-full bg-accent' />
                  <span className='text-sm font-medium'>Lista de Deseos</span>
                </div>
                <span className='text-sm font-bold'>{stats.byStatus.wishlist}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Genre Breakdown */}
        <Card className='bg-card border-border'>
          <CardHeader>
            <CardTitle>Géneros Favoritos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {stats.byGenre.slice(0, 5).map((item, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>{item.genre}</span>
                  <div className='flex items-center gap-2'>
                    <div className='h-2 w-24 bg-muted rounded-full overflow-hidden'>
                      <div className='h-full bg-primary rounded-full' style={{ width: `${(item.count / stats.totalGames) * 100}%` }} />
                    </div>
                    <span className='text-sm font-bold w-8 text-right'>{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Rated Games */}
      <Card className='bg-card border-border'>
        <CardHeader>
          <CardTitle>Juegos Mejor Valorados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {stats.topRated.map((game, index) => (
              <div key={index} className='flex items-center justify-between p-3 rounded-lg bg-muted/50'>
                <div className='flex items-center gap-3'>
                  <span className='text-2xl font-bold text-primary'>#{index + 1}</span>
                  <span className='font-medium'>{game.title}</span>
                </div>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-4 w-4 ${star <= game.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
