import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { getCurrentUserBorrowedBooks, books } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { Clock, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

const MyBooks: React.FC = () => {
  // Assume current user is user2
  const borrowedBooks = getCurrentUserBorrowedBooks('user2');
  
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Dipinjam',
          icon: <Clock size={16} className="mr-1" />,
          class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        };
      case 'returned':
        return {
          label: 'Dikembalikan',
          icon: <CheckCircle size={16} className="mr-1" />,
          class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        };
      case 'overdue':
        return {
          label: 'Terlambat',
          icon: <AlertCircle size={16} className="mr-1" />,
          class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
      default:
        return {
          label: status,
          icon: null,
          class: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        };
    }
  };

  const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Buku Saya</h1>
        
        {borrowedBooks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            <h2 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Belum Ada Buku Dipinjam
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Anda belum meminjam buku apa pun saat ini.
            </p>
            <div className="mt-6">
              <Link to="/books">
                <Button variant="primary">Lihat Katalog Buku</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {borrowedBooks.map((borrowedBook) => {
                const { label, icon, class: statusClass } = getStatusInfo(borrowedBook.status);
                const daysLeft = calculateDaysLeft(borrowedBook.dueDate);
                
                return (
                  <div key={borrowedBook.id} className="p-6 flex flex-col sm:flex-row">
                    <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={borrowedBook.book?.coverImage} 
                        alt={borrowedBook.book?.title}
                        className="w-full sm:w-32 h-40 object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="sm:ml-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {borrowedBook.book?.title}
                        </h2>
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center ${statusClass}`}>
                          {icon}
                          {label}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Penulis: {borrowedBook.book?.author}
                      </p>
                      
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-500">Tanggal Pinjam:</span>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {borrowedBook.borrowDate}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-500">Tanggal Kembali:</span>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {borrowedBook.dueDate}
                          </p>
                        </div>
                      </div>
                      
                      {borrowedBook.status === 'active' && (
                        <p className={`mt-2 text-sm ${
                          daysLeft <= 3 ? 'text-red-600 dark:text-red-400' : 
                          daysLeft <= 7 ? 'text-yellow-600 dark:text-yellow-400' : 
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {daysLeft <= 0 
                            ? 'Buku telah melewati batas waktu pengembalian!'
                            : `${daysLeft} hari tersisa untuk pengembalian`}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4 flex justify-between items-center">
                        <Link 
                          to={`/books/${borrowedBook.bookId}`}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                        >
                          Detail Buku
                        </Link>
                        
                        {borrowedBook.status === 'active' && (
                          <Button variant="secondary" size="sm">
                            Kembalikan Buku
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBooks;