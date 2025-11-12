'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export function AddReviewDialog({ open, onOpenChange, onSuccess }: AddReviewDialogProps) {
  const [games, setGames] = useState<Array<{ _id: string; title: string }>>([]);
  const [formData, setFormData] = useState({
    gameId: '',
    rating: 0,
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      fetchGames();
    }
  }, [open]);

  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_URL}/api/games`);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gameId || formData.rating === 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        onOpenChange(false);
        setFormData({ gameId: '', rating: 0, content: '' });
      }
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] bg-card'>
        <DialogHeader>
          <DialogTitle>Escribir Nueva Reseña</DialogTitle>
          <DialogDescription>Comparte tu opinión sobre un juego de tu biblioteca</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='game'>Selecciona un Juego *</Label>
            <Select value={formData.gameId} onValueChange={(value) => setFormData({ ...formData, gameId: value })}>
              <SelectTrigger className='bg-background border-border'>
                <SelectValue placeholder='Elige un juego...' />
              </SelectTrigger>
              <SelectContent>
                {games.map((game) => (
                  <SelectItem key={game._id} value={game._id}>
                    {game.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Puntuación *</Label>
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className='transition-transform hover:scale-110'
                >
                  <Star className={cn('h-10 w-10 cursor-pointer', star <= formData.rating ? 'fill-primary text-primary' : 'text-muted-foreground')} />
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='content'>Tu Reseña *</Label>
            <Textarea
              id='content'
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder='¿Qué te pareció el juego? Comparte tu experiencia...'
              className='min-h-[200px] bg-background border-border resize-none'
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)} className='flex-1'>
              Cancelar
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting || !formData.gameId || formData.rating === 0}
              className='flex-1 bg-primary text-primary-foreground hover:bg-primary/90'
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
