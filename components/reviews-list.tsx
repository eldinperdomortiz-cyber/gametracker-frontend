'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ReviewCard } from './review-card';
import { AddReviewDialog } from './add-review-dialog';

interface Review {
  _id: string;
  gameId: string;
  gameTitle: string;
  rating: number;
  content: string;
  createdAt: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [searchQuery, reviews]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reviews`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const filterReviews = () => {
    if (searchQuery) {
      const filtered = reviews.filter(
        (review) =>
          review.gameTitle.toLowerCase().includes(searchQuery.toLowerCase()) || review.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredReviews(filtered);
    } else {
      setFilteredReviews(reviews);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-4xl font-bold text-balance'>Mis Reseñas</h1>
          <p className='text-muted-foreground mt-2'>
            {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'} escritas
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className='bg-primary text-primary-foreground hover:bg-primary/90'>
          <Plus className='h-5 w-5 mr-2' />
          Escribir Reseña
        </Button>
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
        <Input
          type='text'
          placeholder='Buscar reseñas...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='pl-10 bg-card border-border'
        />
      </div>

      {filteredReviews.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <MessageSquare className='h-16 w-16 text-muted-foreground mb-4' />
          <h3 className='text-xl font-semibold mb-2'>No hay reseñas todavía</h3>
          <p className='text-muted-foreground mb-6'>
            {searchQuery ? 'No se encontraron reseñas con esos criterios' : 'Comparte tus opiniones sobre los juegos que has jugado'}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className='h-5 w-5 mr-2' />
              Escribir tu primera reseña
            </Button>
          )}
        </div>
      ) : (
        <div className='grid gap-6'>
          {filteredReviews.map((review) => (
            <ReviewCard key={review._id} review={review} onUpdate={fetchReviews} />
          ))}
        </div>
      )}

      <AddReviewDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSuccess={fetchReviews} />
    </div>
  );
}
