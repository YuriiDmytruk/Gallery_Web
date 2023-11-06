'use client';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';

import NavBar from './components/NavBar';

import { store } from './redux/store';
import { UserType } from './types';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <html lang="en" data-theme="custom" className="bg-neutral">
      <body className={inter.className}>
        <Provider store={store}>
          <NavBar
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          {children}
        </Provider>
      </body>
    </html>
  );
}
