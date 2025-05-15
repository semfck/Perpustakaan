import React from 'react';
import { Book } from '../../types';
import { BookCard } from '../book/BookCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedBooksProps {
  books: Book[];
}

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  // Only show first 3 books for featured section
  const featuredBooks = books.slice(0, 3);

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Buku Pilihan</h2>
        <Link 
          to="/books" 
          className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 inline-flex items-center"
        >
          Lihat Semua <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};