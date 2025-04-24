// app/configurator/page.tsx — Styled configurator like Asteria Maps

'use client';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmlsaXBhbmRqb2FubmUiLCJhIjoiY205OXJ0ajYwMGVvZjJqc2U5aWJ1cnIyaiJ9.1ADew7BCYvir8s01V1hqBQ';

export default function ConfiguratorPage() {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [theme, setTheme] = useState('streets');
  const [orientation, setOrientation] = useState('portrait');
  const [size, setSize] = useState('A3');
  const [cart, setCart] = useState<any[]>([]);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (location.length < 2) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await res.json();
      setSuggestions(data.features);
    }, 300);
  }, [location]);

  const previewUrl = selectedPlace
    ? `https://api.mapbox.com/styles/v1/mapbox/${theme}-v11/static/${selectedPlace.center[0]},${selectedPlace.center[1]},12/600x800?access_token=${MAPBOX_TOKEN}`
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f4f4f4] font-sans">
      {/* Left Panel - Controls */}
      <div className="lg:w-[40%] w-full p-6 lg:p-10 bg-white shadow-md border-r border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Your Map</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search city, town, or place"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-200 rounded mt-1 w-full max-h-48 overflow-auto shadow text-sm">
                  {suggestions.map((place) => (
                    <li
                      key={place.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedPlace(place);
                        setLocation(place.place_name);
                        setSuggestions([]);
                      }}
                    >
                      {place.place_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Map Style</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
            >
              <option value="streets">Streets</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="satellite">Satellite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
            <div className="flex gap-3">
              <button
                onClick={() => setOrientation('portrait')}
                className={`flex-1 border rounded-md px-4 py-2 text-sm ${orientation === 'portrait' ? 'bg-gray-200 border-black' : 'hover:bg-gray-100'}`}
              >
                Portrait
              </button>
              <button
                onClick={() => setOrientation('landscape')}
                className={`flex-1 border rounded-md px-4 py-2 text-sm ${orientation === 'landscape' ? 'bg-gray-200 border-black' : 'hover:bg-gray-100'}`}
              >
                Landscape
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
            >
              <option>A4</option>
              <option>A3</option>
              <option>A2</option>
              <option>30x40cm</option>
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition text-sm font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:w-[60%] w-full flex items-center justify-center bg-gray-100 p-10">
        <div className="bg-white w-full max-w-md rounded-lg overflow-hidden shadow-md border aspect-[3/4] flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Map Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Map preview will appear here</span>
          )}
        </div>
      </div>
    </div>
  );
}
