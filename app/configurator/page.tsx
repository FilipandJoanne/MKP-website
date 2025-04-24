'use client';

import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmlsaXBhbmRqb2FubmUiLCJhIjoiY205OXJ0ajYwMGVvZjJqc2U5aWJ1cnIyaiJ9.1ADew7BCYvir8s01V1hqBQ';

export default function ConfiguratorPage() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [theme, setTheme] = useState('streets');
  const [orientation, setOrientation] = useState('portrait');
  const [size, setSize] = useState('A3');
  const [cart, setCart] = useState<any[]>([]);
  const timeoutRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}`);
      const data = await res.json();
      setSuggestions(data.features);
    }, 300);
  }, [query]);

  const previewUrl = selectedPlace
    ? `https://api.mapbox.com/styles/v1/mapbox/${theme}-v10/static/${selectedPlace.center[0]},${selectedPlace.center[1]},12/800x500?access_token=${MAPBOX_TOKEN}`
    : '';

  const handleAddToCart = () => {
    if (!selectedPlace) return;

    const item = {
      designId: uuidv4(),
      location: selectedPlace.place_name,
      coordinates: selectedPlace.center,
      theme,
      orientation,
      size,
      previewUrl,
      price: 14.99
    };

    setCart((prev) => [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold mb-6">Customize Your Map</h1>

          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a city or place"
            className="w-full border rounded px-3 py-2 mb-2"
          />
          {suggestions.length > 0 && (
            <ul className="border rounded bg-white shadow text-sm max-h-48 overflow-auto mb-4">
              {suggestions.map((place: any) => (
                <li
                  key={place.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedPlace(place);
                    setQuery(place.place_name);
                    setSuggestions([]);
                  }}
                >
                  {place.place_name}
                </li>
              ))}
            </ul>
          )}

          <label className="block font-medium mt-4 mb-1">Map Style</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full border rounded px-3 py-2 mb-4">
            <option value="streets">Streets</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="satellite">Satellite</option>
          </select>

          <label className="block font-medium mb-1">Orientation</label>
          <div className="flex gap-4 mb-4">
            <label className="inline-flex items-center">
              <input type="radio" value="portrait" checked={orientation === 'portrait'} onChange={() => setOrientation('portrait')} />
              <span className="ml-2">Portrait</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="landscape" checked={orientation === 'landscape'} onChange={() => setOrientation('landscape')} />
              <span className="ml-2">Landscape</span>
            </label>
          </div>

          <label className="block font-medium mb-1">Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full border rounded px-3 py-2 mb-6">
            <option value="A4">A4</option>
            <option value="A3">A3</option>
            <option value="A2">A2</option>
            <option value="A1">A1</option>
            <option value="30x40cm">30x40 cm</option>
          </select>

          <button
            className="w-full bg-black text-white py-3 rounded text-lg hover:bg-gray-800 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

        {/* Preview */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="aspect-video border bg-gray-200 flex items-center justify-center">
            {previewUrl ? (
              <img src={previewUrl} alt="Map Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500">Map preview will appear here</span>
            )}
          </div>

          {cart.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">🛒 Cart</h3>
              <ul className="space-y-3">
                {cart.map((item, index) => (
                  <li key={index} className="border rounded p-4">
                    <div className="text-sm text-gray-700">
                      <strong>Location:</strong> {item.location} <br />
                      <strong>Style:</strong> {item.theme} <br />
                      <strong>Orientation:</strong> {item.orientation} <br />
                      <strong>Size:</strong> {item.size}
                    </div>
                    <img src={item.previewUrl} className="w-full mt-2 rounded border" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center text-sm text-gray-400 mt-10">
        Framing memories
      </footer>
    </div>
  );
}
