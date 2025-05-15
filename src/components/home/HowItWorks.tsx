import React from 'react';
import { BookOpen, RotateCw, CheckCircle } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cara Kerja Peminjaman</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sistem peminjaman buku yang mudah dan cepat untuk mendapatkan akses ke koleksi perpustakaan kami.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step 
            icon={<BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
            title="Pilih Buku"
            description="Cari dan pilih buku yang ingin Anda pinjam dari koleksi perpustakaan kami yang lengkap."
          />
          
          <Step 
            icon={<RotateCw className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
            title="Proses Peminjaman"
            description="Pinjam buku dengan sekali klik. Buku akan tercatat dalam koleksi Anda dengan tanggal pengembalian."
          />
          
          <Step 
            icon={<CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
            title="Kembalikan Tepat Waktu"
            description="Kembalikan buku sebelum tanggal jatuh tempo untuk menghindari denda keterlambatan."
          />
        </div>
      </div>
    </div>
  );
};