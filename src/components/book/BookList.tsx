import React, { useState } from 'react';
import { BookWithStatus } from '../../types';
import { BookCard } from './BookCard';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/Input';

interface BookListProps {
  books: BookWithStatus[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  // Get unique categories
  const categories = [...new Set(books.map(book => book.category))];
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || book.category === categoryFilter;
    
    const matchesAvailability = 
      availabilityFilter === '' || 
      (availabilityFilter === 'available' && book.availableCopies > 0) ||
      (availabilityFilter === 'borrowed' && book.availableCopies === 0);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAvailabilityFilter(e.target.value);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Katalog Buku</h2>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/2">
            <Input
              label="Cari Buku"
              placeholder="Judul atau penulis..."
              value={searchQuery}
              onChange={handleSearchChange}
              icon={<Search size={18} className="text-gray-500 dark:text-gray-400" />}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-1/2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kategori
              </label>
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                value={categoryFilter}
                onChange={handleCategoryChange}
              >
                <option value="">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ketersediaan
              </label>
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                value={availabilityFilter}
                onChange={handleAvailabilityChange}
              >
                <option value="">Semua Status</option>
                <option value="available">Tersedia</option>
                <option value="borrowed">Dipinjam</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tidak ada buku yang sesuai dengan filter saat ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};