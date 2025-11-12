'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, Edit, Trash2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EditGameDialog } from './edit-game-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';

interface GameCardProps {
  game: {
    _id: string;
    title: string;
    platform: string;
    genre: string;
    coverImage?: string;
    rating: number;
    status: 'playing' | 'completed' | 'backlog' | 'wishlist';
    hoursPlayed: number;
  };
  onUpdate: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export function GameCard({ game, onUpdate }: GameCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusColors = {
    playing: 'bg-primary/20 text-primary border-primary/40',
    completed: 'bg-green-500/20 text-green-500 border-green-500/40',
    backlog: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
    wishlist: 'bg-accent/20 text-accent border-accent/40',
  };

  const statusLabels = {
    playing: 'Jugando',
    completed: 'Completado',
    backlog: 'Pendiente',
    wishlist: 'Deseado',
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_URL}/api/games/${game._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting game:', error);
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  return (
    <>
      <Card className='group overflow-hidden bg-card border-border hover:border-primary/50 transition-all'>
        <div className='relative aspect-[3/4] overflow-hidden bg-muted'>
          {game.coverImage ? (
            <img
              src={game.coverImage || '/placeholder.svg'}
              alt={game.title}
              className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-300'
            />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <span className='text-6xl'>🎮</span>
            </div>
          )}
          <div className='absolute top-2 right-2'>
            <span className={cn('px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm', statusColors[game.status])}>
              {statusLabels[game.status]}
            </span>
          </div>
        </div>

        <CardContent className='p-4 space-y-3'>
          <div>
            <h3 className='font-bold text-lg line-clamp-1 text-balance'>{game.title}</h3>
            <p className='text-sm text-muted-foreground'>{game.platform}</p>
            <p className='text-xs text-muted-foreground'>{game.genre}</p>
          </div>

          <div className='flex items-center gap-1'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={cn('h-4 w-4', star <= game.rating ? 'fill-primary text-primary' : 'text-muted-foreground')} />
            ))}
          </div>

          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Clock className='h-4 w-4' />
            <span>{game.hoursPlayed}h jugadas</span>
          </div>

          <div className='flex gap-2 pt-2'>
            <Button variant='outline' size='sm' className='flex-1 bg-transparent' onClick={() => setIsEditOpen(true)}>
              <Edit className='h-4 w-4 mr-1' />
              Editar
            </Button>
            <Link href={`/reviews?game=${game._id}`} className='flex-1'>
              <Button variant='outline' size='sm' className='w-full bg-transparent'>
                <MessageSquare className='h-4 w-4 mr-1' />
                Reseñar
              </Button>
            </Link>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsDeleteOpen(true)}
              className='hover:bg-destructive hover:text-destructive-foreground'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditGameDialog game={game} open={isEditOpen} onOpenChange={setIsEditOpen} onSuccess={onUpdate} />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar juego?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción eliminará "{game.title}" de tu biblioteca permanentemente.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
