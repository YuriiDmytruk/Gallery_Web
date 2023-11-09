import React from 'react';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';

import NavBar from './components/NavBar';

import { store } from './redux/store';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="custom" className="bg-neutral">
      <body className={inter.className}>
        <Provider store={store}>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
