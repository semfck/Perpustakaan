import { Book, BorrowRecord, User, BookWithStatus } from '../types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'Admin',
    email: 'admin@perpus.com',
    role: 'admin'
  },
  {
    id: 'user2',
    name: 'Budi Santoso',
    email: 'budi@gmail.com',
    role: 'user'
  },
  {
    id: 'user3',
    name: 'Ani Wijaya',
    email: 'ani@gmail.com',
    role: 'user'
  }
];

export const books: Book[] = [
  {
    id: 'book1',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    isbn: '9789793062792',
    category: 'Novel',
    coverImage: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Kisah tentang perjuangan 10 anak dari Belitung Timur untuk mendapatkan pendidikan layak.',
    publishedYear: 2005,
    totalCopies: 5,
    availableCopies: 3
  },
  {
    id: 'book2',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    isbn: '9789799731234',
    category: 'Novel Sejarah',
    coverImage: 'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Tetralogi Buru yang menceritakan tentang perjuangan bangsa Indonesia di masa penjajahan Belanda.',
    publishedYear: 1980,
    totalCopies: 3,
    availableCopies: 1
  },
  {
    id: 'book3',
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    isbn: '9786024246945',
    category: 'Filsafat',
    coverImage: 'https://images.pexels.com/photos/5834420/pexels-photo-5834420.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Buku tentang filosofi Stoa yang mengajarkan ketenangan dalam menghadapi masalah hidup.',
    publishedYear: 2018,
    totalCopies: 7,
    availableCopies: 4
  },
  {
    id: 'book4',
    title: 'Rentang Kisah',
    author: 'Gita Savitri Devi',
    isbn: '9786020395937',
    category: 'Biografi',
    coverImage: 'https://images.pexels.com/photos/5834346/pexels-photo-5834346.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Perjalanan hidup seorang Gita Savitri Devi selama menempuh pendidikan di Jerman.',
    publishedYear: 2017,
    totalCopies: 4,
    availableCopies: 2
  },
  {
    id: 'book5',
    title: 'Laut Bercerita',
    author: 'Leila S. Chudori',
    isbn: '9786024246723',
    category: 'Novel',
    coverImage: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Novel yang mengisahkan tentang hilangnya para aktivis di tahun 1998.',
    publishedYear: 2017,
    totalCopies: 3,
    availableCopies: 1
  },
  {
    id: 'book6',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9786026670410',
    category: 'Pengembangan Diri',
    coverImage: 'https://images.pexels.com/photos/3747497/pexels-photo-3747497.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Buku tentang bagaimana membangun kebiasaan baik dan menghilangkan kebiasaan buruk.',
    publishedYear: 2018,
    totalCopies: 5,
    availableCopies: 0
  }
];

export const borrowRecords: BorrowRecord[] = [
  {
    id: 'borrow1',
    bookId: 'book1',
    userId: 'user2',
    borrowDate: '2023-10-10',
    dueDate: '2023-10-24',
    returnDate: '2023-10-20',
    status: 'returned'
  },
  {
    id: 'borrow2',
    bookId: 'book2',
    userId: 'user2',
    borrowDate: '2023-11-05',
    dueDate: '2023-11-19',
    returnDate: null,
    status: 'active'
  },
  {
    id: 'borrow3',
    bookId: 'book3',
    userId: 'user3',
    borrowDate: '2023-11-10',
    dueDate: '2023-11-24',
    returnDate: null,
    status: 'active'
  },
  {
    id: 'borrow4',
    bookId: 'book5',
    userId: 'user2',
    borrowDate: '2023-12-01',
    dueDate: '2023-12-15',
    returnDate: null,
    status: 'active'
  },
  {
    id: 'borrow5',
    bookId: 'book6',
    userId: 'user3',
    borrowDate: '2023-12-05',
    dueDate: '2023-12-19',
    returnDate: null,
    status: 'overdue'
  }
];

export const getBookWithStatus = (userId: string): BookWithStatus[] => {
  const userBorrows = borrowRecords.filter(
    record => record.userId === userId && record.returnDate === null
  );

  return books.map(book => {
    const borrowRecord = userBorrows.find(record => record.bookId === book.id);
    
    if (borrowRecord) {
      return {
        ...book,
        borrowStatus: {
          status: borrowRecord.status === 'overdue' ? 'overdue' : 'borrowed',
          dueDate: borrowRecord.dueDate
        }
      };
    }
    
    return {
      ...book,
      borrowStatus: {
        status: book.availableCopies > 0 ? 'available' : 'borrowed'
      }
    };
  });
};

export const getCurrentUserBorrowedBooks = (userId: string) => {
  const userBorrows = borrowRecords.filter(
    record => record.userId === userId && record.returnDate === null
  );
  
  return userBorrows.map(borrow => {
    const book = books.find(b => b.id === borrow.bookId);
    return {
      ...borrow,
      book
    };
  });
};