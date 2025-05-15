import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Mail, Key, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Budi Santoso',
    email: 'budi@gmail.com',
    memberSince: '01 Januari 2023',
    borrowedCount: 5,
    returnedCount: 3
  });
  
  const [formData, setFormData] = useState({
    name: profileData.name,
    email: profileData.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfileData({
        ...profileData,
        name: formData.name,
        email: formData.email
      });
    }
    setIsEditing(!isEditing);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEditToggle();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profil Saya</h1>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {profileData.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Anggota sejak {profileData.memberSince}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleEditToggle}
                variant={isEditing ? "primary" : "outline"}
                leftIcon={isEditing ? <Save size={16} /> : undefined}
              >
                {isEditing ? "Simpan Perubahan" : "Edit Profil"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex-shrink-0">
                  <Book className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Buku Dipinjam
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {profileData.borrowedCount}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Buku Dikembalikan
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {profileData.returnedCount}
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <Input
                  label="Nama Lengkap"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  icon={<User size={18} className="text-gray-500 dark:text-gray-400" />}
                  disabled={!isEditing}
                />
                
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={<Mail size={18} className="text-gray-500 dark:text-gray-400" />}
                  disabled={!isEditing}
                />
                
                {isEditing && (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-8 mb-4">
                      Ubah Password
                    </h3>
                    
                    <Input
                      label="Password Saat Ini"
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      icon={<Key size={18} className="text-gray-500 dark:text-gray-400" />}
                    />
                    
                    <Input
                      label="Password Baru"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      icon={<Key size={18} className="text-gray-500 dark:text-gray-400" />}
                    />
                    
                    <Input
                      label="Konfirmasi Password Baru"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      icon={<Key size={18} className="text-gray-500 dark:text-gray-400" />}
                    />
                  </>
                )}
              </div>
              
              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-4"
                    onClick={() => setIsEditing(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" variant="primary">
                    Simpan Perubahan
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

function Book(props: any) {
  return <BookIcon {...props} />;
}

function CheckCircle(props: any) {
  return <CheckCircleIcon {...props} />;
}

import { Book as BookIcon, CheckCircle as CheckCircleIcon } from 'lucide-react';

export default Profile;