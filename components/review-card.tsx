'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Edit, Trash2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EditReviewDialog } from './edit-review-dialog';
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

interface ReviewCardProps {
  review: {
    _id: string;
    gameId: string;
    gameTitle: string;
    rating: number;
    content: string;
    createdAt: string;
  };
  onUpdate: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export function ReviewCard({ review, onUpdate }: ReviewCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_URL}/api/reviews/${review._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Card className='bg-card border-border hover:border-primary/50 transition-colors'>
        <CardHeader>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <h3 className='text-xl font-bold mb-2'>{review.gameTitle}</h3>
              <div className='flex items-center gap-4'>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={cn('h-5 w-5', star <= review.rating ? 'fill-primary text-primary' : 'text-muted-foreground')} />
                  ))}
                </div>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  {formatDate(review.createdAt)}
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm' onClick={() => setIsEditOpen(true)}>
                <Edit className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsDeleteOpen(true)}
                className='hover:bg-destructive hover:text-destructive-foreground'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-foreground leading-relaxed whitespace-pre-wrap'>{review.content}</p>
        </CardContent>
      </Card>

      <EditReviewDialog review={review} open={isEditOpen} onOpenChange={setIsEditOpen} onSuccess={onUpdate} />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar reseña?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción eliminará tu reseña de "{review.gameTitle}" permanentemente.</AlertDialogDescription>
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
