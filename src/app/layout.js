import "./globals.css";
import Navigation from "../components/Navigation";
import NotificationBell from "../components/NotificationBell";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="bg-gray-50 flex flex-col md:flex-row min-h-screen">
        <Navigation />

        <div className="flex-1 flex flex-col">
          <header className="w-full bg-white border-b p-4 flex justify-between items-center px-8 md:sticky md:top-0 z-40">
            <div className="md:hidden font-black text-[#004A8D]">BIOGUARD</div>
            <div className="hidden md:block text-sm text-gray-500 font-medium">Bem-vindo, Leandro</div>
            
            <div className="flex items-center gap-4">
              <NotificationBell />
              <div className="w-8 h-8 bg-[#FFD100] rounded-full flex items-center justify-center font-bold text-[#004A8D] text-xs">L</div>
            </div>
          </header>

          <main className="p-4 md:p-8 pb-24 md:pb-8">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}