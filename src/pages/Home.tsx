import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/home/Hero';
import { FeaturedBooks } from '../components/home/FeaturedBooks';
import { HowItWorks } from '../components/home/HowItWorks';
import { books } from '../utils/mockData';

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedBooks books={books} />
      </div>
      <HowItWorks />
    </Layout>
  );
};

export default Home;