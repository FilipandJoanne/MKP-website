// app/page.tsx — Asteria-style homepage with placeholders

export default function HomePage() {
    return (
      <div className="space-y-24">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold mb-4">Create Custom Map Prints</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Personalize your favorite place and turn it into a beautiful framed artwork. Just like Asteria Maps, but with our own twist.
          </p>
          <a
            href="/configurator"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
          >
            Start Designing
          </a>
        </section>
  
        {/* Product Previews */}
        <section id="products">
          <h2 className="text-2xl font-semibold mb-6 text-center">Popular Map Styles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                <div className="bg-gray-200 aspect-[3/4] flex items-center justify-center">
                  <span className="text-gray-400">Artwork {i}</span>
                </div>
                <div className="p-4">
                  <p className="font-medium">City Name {i}</p>
                  <p className="text-sm text-gray-500">Style: Modern | Size: A3</p>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Testimonials */}
        <section id="testimonials">
          <h2 className="text-2xl font-semibold mb-6 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <p className="text-sm italic text-gray-700">
                “I ordered a custom map of Paris for our anniversary. The quality is stunning and shipping was fast!”
              </p>
              <p className="text-sm mt-3 font-medium text-gray-600">– Emily, UK</p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <p className="text-sm italic text-gray-700">
                “Love the configurator – it’s easy to use and the prints look even better in person.”
              </p>
              <p className="text-sm mt-3 font-medium text-gray-600">– Lukas, Germany</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
  