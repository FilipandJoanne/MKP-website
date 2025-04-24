export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head />
        <body className="bg-gray-50 text-gray-800 font-sans">
          {/* Header */}
          <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <a href="/" className="text-2xl font-bold tracking-tight">
                MKP Prints
              </a>
              <nav className="space-x-4 text-sm font-medium">
                <a href="/" className="hover:text-blue-500">Home</a>
                <a href="/configurator" className="hover:text-blue-500">Create Your Map</a>
                <a href="#company" className="hover:text-blue-500">Company</a>
                <a href="#star-map" className="hover:text-blue-500">Star Map</a>
                <a href="#location-map" className="hover:text-blue-500">Location Map</a>
                <a href="#cityscape-art" className="hover:text-blue-500">Cityscape Art</a>
                <a href="#frames" className="hover:text-blue-500">Frames</a>
                <a href="#phone-covers" className="hover:text-blue-500">Phone Covers</a>
                <a href="#mugs" className="hover:text-blue-500">Mugs</a>
              </nav>
            </div>
          </header>
  
          {/* Main content */}
          <main className="max-w-7xl mx-auto px-6 py-12">
            {children}
          </main>
  
          {/* Footer */}
          <footer className="bg-gray-100 text-center text-sm text-gray-500 py-6">
            Framing memories © {new Date().getFullYear()} MKP Prints
          </footer>
        </body>
      </html>
    );
  }
  