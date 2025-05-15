export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  coverImage: string;
  description: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: 'active' | 'returned' | 'overdue';
}

export interface BookWithStatus extends Book {
  borrowStatus?: {
    status: 'borrowed' | 'available' | 'overdue';
    dueDate?: string;
  };
}