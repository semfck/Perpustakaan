import React, { useState } from 'react';
import { Book, BorrowRecord } from '../../types';
import { Button } from '../ui/Button';
import { Calendar, User, Book as BookIcon, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface BookDetailProps {
  book: Book;
  borrowRecords?: BorrowRecord[];
  onBorrow?: () => void;
  onReturn?: () => void;
  currentUserBorrowed?: boolean;
}

export const BookDetail: React.FC<BookDetailProps> = ({ 
  book, 
  borrowRecords = [], 
  onBorrow, 
  onReturn,
  currentUserBorrowed = false
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBorrow = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (onBorrow) onBorrow();
      setIsLoading(false);
    }, 1000);
  };

  const handleReturn = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (onReturn) onReturn();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="flex flex-col h-full">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full">
                  {book.category}
                </span>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                by <span className="font-medium">{book.author}</span>
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <BookIcon size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">ISBN: {book.isbn}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Tahun: {book.publishedYear}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Tersedia: {book.availableCopies} dari {book.totalCopies}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Deskripsi</h3>
                <p className="text-gray-600 dark:text-gray-400">{book.description}</p>
              </div>
            </div>
            
            <div className="mt-auto">
              {currentUserBorrowed ? (
                <Button
                  onClick={handleReturn}
                  variant="secondary"
                  fullWidth
                  isLoading={isLoading}
                  leftIcon={<CheckCircle size={18} />}
                >
                  Kembalikan Buku
                </Button>
              ) : (
                <Button
                  onClick={handleBorrow}
                  variant="primary"
                  fullWidth
                  disabled={book.availableCopies === 0}
                  isLoading={isLoading}
                  leftIcon={<BookIcon size={18} />}
                >
                  {book.availableCopies > 0 ? 'Pinjam Buku' : 'Buku Tidak Tersedia'}
                </Button>
              )}
              
              {borrowRecords.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Riwayat Peminjaman
                  </h3>
                  <div className="space-y-2">
                    {borrowRecords.map((record) => (
                      <div 
                        key={record.id} 
                        className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
                      >
                        <div className="flex items-center">
                          <User size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {record.userId}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {record.borrowDate} - {record.returnDate || 'belum dikembalikan'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};