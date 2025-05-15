import React from 'react';
import { Layout } from '../components/layout/Layout';
import { BookList } from '../components/book/BookList';
import { getBookWithStatus } from '../utils/mockData';

const BookCatalog: React.FC = () => {
  // Assume we're logged in as user2 for this demo
  const booksWithStatus = getBookWithStatus('user2');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <BookList books={booksWithStatus} />
      </div>
    </Layout>
  );
};

export default BookCatalog;