'use client'
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';

import NavBar from './components/NavBar';

import { metadata } from './metadata';
import { store } from './redux/store';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('custom')
  return (
    <html lang="en" data-theme={theme} className="bg-neutral">
      <body className={inter.className}>
        <Provider store={store}>
          <NavBar setTheme={setTheme}/>
          {children}
        </Provider>
      </body>
    </html>
  );
}
