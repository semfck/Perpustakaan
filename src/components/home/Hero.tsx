import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-poppins">
          Perpustakaan Digital <br className="hidden sm:block" />
          <span className="text-amber-400">untuk Semua</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
          Temukan ribuan buku dari berbagai kategori. Pinjam dan baca kapan saja, di mana saja.
        </p>
        <div className="mt-10 max-w-sm sm:max-w-md w-full">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              placeholder="Cari judul buku atau penulis..."
            />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/books">
            <Button size="lg">
              Lihat Katalog
            </Button>
          </Link>
          <Link to="/my-books">
            <Button variant="outline" size="lg" className="bg-white dark:bg-transparent">
              Koleksi Saya
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};