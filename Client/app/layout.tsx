'use client';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

import NavBar from './components/NavBar';

import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <html lang="en" data-theme="custom" className="bg-neutral">
      <body className={inter.className}>
        <NavBar
          active={active}
          setActive={setActive}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        {children}
      </body>
    </html>
  );
}
