import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { BookDetail } from '../components/book/BookDetail';
import { books, borrowRecords } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState(books.find(b => b.id === id));
  const [bookBorrowRecords, setBookBorrowRecords] = useState(
    borrowRecords.filter(record => record.bookId === id)
  );
  const [currentUserBorrowed, setCurrentUserBorrowed] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundBook = books.find(b => b.id === id);
      setBook(foundBook);
      
      const records = borrowRecords.filter(record => record.bookId === id);
      setBookBorrowRecords(records);
      
      // Check if current user (assume user2) has borrowed this book
      const userHasBorrowed = records.some(
        record => record.userId === 'user2' && record.returnDate === null
      );
      setCurrentUserBorrowed(userHasBorrowed);
    }
  }, [id]);

  const handleBorrowBook = () => {
    if (!book) return;
    
    // Simulate borrowing the book (would be a backend API call in a real app)
    // Create a borrowed record for the current user
    alert(`Buku "${book.title}" berhasil dipinjam!`);
    
    // Update book availability
    setBook({
      ...book,
      availableCopies: book.availableCopies - 1
    });
    
    setCurrentUserBorrowed(true);
  };

  const handleReturnBook = () => {
    if (!book) return;
    
    // Simulate returning the book
    alert(`Buku "${book.title}" berhasil dikembalikan!`);
    
    // Update book availability
    setBook({
      ...book,
      availableCopies: book.availableCopies + 1
    });
    
    setCurrentUserBorrowed(false);
  };

  if (!book) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Buku tidak ditemukan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Buku yang Anda cari tidak tersedia.
          </p>
          <Link to="/books">
            <Button variant="primary">Kembali ke Katalog</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link 
            to="/books" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
          >
            <ArrowLeft size={16} className="mr-1" />
            Kembali ke Katalog
          </Link>
        </div>
        
        <BookDetail 
          book={book} 
          borrowRecords={bookBorrowRecords}
          onBorrow={handleBorrowBook}
          onReturn={handleReturnBook}
          currentUserBorrowed={currentUserBorrowed}
        />
      </div>
    </Layout>
  );
};

export default BookDetails;