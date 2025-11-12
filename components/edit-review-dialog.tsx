'use client';

import type React from 'react';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditReviewDialogProps {
  review: {
    _id: string;
    gameTitle: string;
    rating: number;
    content: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export function EditReviewDialog({ review, open, onOpenChange, onSuccess }: EditReviewDialogProps) {
  const [formData, setFormData] = useState({
    rating: review.rating,
    content: review.content,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/reviews/${review._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error updating review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] bg-card'>
        <DialogHeader>
          <DialogTitle>Editar Reseña</DialogTitle>
          <DialogDescription>Actualiza tu reseña de {review.gameTitle}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
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
            <Label htmlFor='edit-content'>Tu Reseña *</Label>
            <Textarea
              id='edit-content'
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className='min-h-[200px] bg-background border-border resize-none'
            />
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
