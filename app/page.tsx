// app/page.tsx — Homepage with product line placeholders matching nav

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
  
        {/* Section Placeholders */}
        <section id="company" className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Company</h2>
          <p className="text-gray-600">About us and our mission to make personalized artwork more meaningful.</p>
        </section>
  
        <section id="star-map" className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Star Map</h2>
          <p className="text-gray-600">Design a custom star map for special dates — coming soon.</p>
        </section>
  
        <section id="location-map" className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Location Map</h2>
          <p className="text-gray-600">Turn your favorite place into minimalist map prints — preview our builder!</p>
        </section>
  
        <section id="cityscape-art" className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Cityscape Art</h2>
          <p className="text-gray-600">Art prints of famous skylines and iconic cities — coming to the store soon.</p>
        </section>
  
        <section id="frames" className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Frames</h2>
          <p className="text-gray-600">High-quality wooden frames to complement your personalized map prints.</p>
        </section>
  
        <section id="phone-covers" className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Phone Covers</h2>
          <p className="text-gray-600">Stylish phone cases with your custom map designs — launching soon.</p>
        </section>
  
        <section id="mugs" className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Mugs</h2>
          <p className="text-gray-600">Enjoy your favorite place with every sip — mugs with map prints coming soon.</p>
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
  