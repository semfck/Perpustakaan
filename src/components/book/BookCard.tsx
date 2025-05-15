import React from 'react';
import { Link } from 'react-router-dom';
import { Book, BookWithStatus } from '../../types';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface BookCardProps {
  book: BookWithStatus;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const statusStyle = () => {
    if (!book.borrowStatus) return {};
    
    switch (book.borrowStatus.status) {
      case 'borrowed':
        return {
          class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
          icon: <Clock size={16} className="mr-1" />
        };
      case 'available':
        return {
          class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          icon: <CheckCircle size={16} className="mr-1" />
        };
      case 'overdue':
        return {
          class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
          icon: <AlertCircle size={16} className="mr-1" />
        };
      default:
        return {
          class: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
          icon: null
        };
    }
  };

  const { class: statusClass, icon: statusIcon } = statusStyle();

  const formatStatus = (status: string) => {
    switch (status) {
      case 'borrowed':
        return 'Dipinjam';
      case 'available':
        return 'Tersedia';
      case 'overdue':
        return 'Terlambat';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-48 object-cover"
        />
        {book.borrowStatus && (
          <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full flex items-center ${statusClass}`}>
            {statusIcon}
            {formatStatus(book.borrowStatus.status)}
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          by {book.author}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 line-clamp-3">
          {book.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {book.category}
          </span>
          <Link 
            to={`/books/${book.id}`} 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 text-sm font-medium"
          >
            Detail Buku
          </Link>
        </div>
      </div>
    </div>
  );
};