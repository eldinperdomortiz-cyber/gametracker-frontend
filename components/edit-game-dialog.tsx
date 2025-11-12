'use client';

import type React from 'react';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditGameDialogProps {
  game: {
    _id: string;
    title: string;
    platform: string;
    genre: string;
    coverImage?: string;
    rating: number;
    status: string;
    hoursPlayed: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export function EditGameDialog({ game, open, onOpenChange, onSuccess }: EditGameDialogProps) {
  const [formData, setFormData] = useState({
    title: game.title,
    platform: game.platform,
    genre: game.genre,
    coverImage: game.coverImage || '',
    rating: game.rating,
    status: game.status,
    hoursPlayed: game.hoursPlayed,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/games/${game._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error updating game:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px] bg-card'>
        <DialogHeader>
          <DialogTitle>Editar Juego</DialogTitle>
          <DialogDescription>Actualiza la información del juego</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='edit-title'>Título *</Label>
            <Input
              id='edit-title'
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className='bg-background border-border'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='edit-platform'>Plataforma *</Label>
              <Input
                id='edit-platform'
                required
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className='bg-background border-border'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='edit-genre'>Género *</Label>
              <Input
                id='edit-genre'
                required
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className='bg-background border-border'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='edit-coverImage'>URL de Portada</Label>
            <Input
              id='edit-coverImage'
              type='url'
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className='bg-background border-border'
            />
          </div>

          <div className='space-y-2'>
            <Label>Puntuación</Label>
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className='transition-transform hover:scale-110'
                >
                  <Star className={cn('h-8 w-8 cursor-pointer', star <= formData.rating ? 'fill-primary text-primary' : 'text-muted-foreground')} />
                </button>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='edit-status'>Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className='bg-background border-border'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='playing'>Jugando</SelectItem>
                  <SelectItem value='completed'>Completado</SelectItem>
                  <SelectItem value='backlog'>Pendiente</SelectItem>
                  <SelectItem value='wishlist'>Deseado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='edit-hoursPlayed'>Horas Jugadas</Label>
              <Input
                id='edit-hoursPlayed'
                type='number'
                min='0'
                value={formData.hoursPlayed}
                onChange={(e) => setFormData({ ...formData, hoursPlayed: Number.parseInt(e.target.value) || 0 })}
                className='bg-background border-border'
              />
            </div>
          </div>

          <div className='flex gap-3 pt-4'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)} className='flex-1'>
              Cancelar
            </Button>
            <Button type='submit' disabled={isSubmitting} className='flex-1 bg-primary text-primary-foreground hover:bg-primary/90'>
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
