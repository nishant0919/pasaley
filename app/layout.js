import Navbar from '@/components/Navbar';
import './globals.css';
import Providers from '@/components/Providers';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
  title: 'StoreBuilder',
  description: 'Create your store in minutes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Providers>
          <ThemeProvider>
            <Navbar />
            {children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
