import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="container mx-auto px-4 mt-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}