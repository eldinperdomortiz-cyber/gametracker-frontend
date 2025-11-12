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

interface AddGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function AddGameDialog({ open, onOpenChange, onSuccess }: AddGameDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    genre: '',
    coverImage: '',
    rating: 0,
    status: 'backlog',
    hoursPlayed: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        onOpenChange(false);
        setFormData({
          title: '',
          platform: '',
          genre: '',
          coverImage: '',
          rating: 0,
          status: 'backlog',
          hoursPlayed: 0,
        });
      }
    } catch (error) {
      console.error('Error adding game:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px] bg-card'>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Juego</DialogTitle>
          <DialogDescription>Añade un nuevo videojuego a tu biblioteca personal</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Título *</Label>
            <Input
              id='title'
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder='Ej: The Legend of Zelda'
              className='bg-background border-border'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='platform'>Plataforma *</Label>
              <Input
                id='platform'
                required
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                placeholder='Ej: Nintendo Switch'
                className='bg-background border-border'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='genre'>Género *</Label>
              <Input
                id='genre'
                required
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder='Ej: Aventura'
                className='bg-background border-border'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='coverImage'>URL de Portada</Label>
            <Input
              id='coverImage'
              type='url'
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder='https://ejemplo.com/imagen.jpg'
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
              <Label htmlFor='status'>Estado</Label>
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
              <Label htmlFor='hoursPlayed'>Horas Jugadas</Label>
              <Input
                id='hoursPlayed'
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
              {isSubmitting ? 'Agregando...' : 'Agregar Juego'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
