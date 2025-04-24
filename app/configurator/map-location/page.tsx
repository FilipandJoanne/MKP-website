   // app/configurator/map-location/page.tsx — Fully functional Asteria-style configurator

   'use client';

   import { useEffect, useRef, useState } from 'react';
   import { v4 as uuidv4 } from 'uuid';
   
   const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmlsaXBhbmRqb2FubmUiLCJhIjoiY205OXJ0ajYwMGVvZjJqc2U5aWJ1cnIyaiJ9.1ADew7BCYvir8s01V1hqBQ';
   
   export default function MapLocationConfigurator() {
     const [location, setLocation] = useState('');
     const [suggestions, setSuggestions] = useState<any[]>([]);
     const [selectedPlace, setSelectedPlace] = useState<any>(null);
     const [theme, setTheme] = useState('streets');
     const [orientation, setOrientation] = useState('portrait');
     const [size, setSize] = useState('A3');
     const [frame, setFrame] = useState('none');
     const [title, setTitle] = useState('');
     const [subtitle, setSubtitle] = useState('');
     const [caption, setCaption] = useState('');
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
         id: uuidv4(),
         location: selectedPlace.place_name,
         coordinates: selectedPlace.center,
         theme,
         orientation,
         size,
         frame,
         title,
         subtitle,
         caption,
         previewUrl,
         price: 29.99,
       };
       setCart([...cart, item]);
     };
   
     return (
       <div className="bg-gray-50 text-gray-900">
         {/* Section 1: Live Preview + Location Search */}
         <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold mb-6">Preview Your Map</h2>
           <div className="flex flex-col lg:flex-row gap-8">
             <div className="flex-1 border rounded-lg bg-white shadow p-4">
               <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
                 {previewUrl ? (
                   <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded" />
                 ) : (
                   <span className="text-gray-400">Map preview will appear here</span>
                 )}
               </div>
             </div>
             <div className="flex-1">
               <label className="block text-sm font-medium text-gray-700 mb-2">Location Search</label>
               <input
                 type="text"
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}
                 placeholder="Search for a city or location"
                 className="w-full border rounded px-4 py-2 mb-2"
               />
               {suggestions.length > 0 && (
                 <ul className="bg-white border rounded shadow max-h-48 overflow-auto text-sm">
                   {suggestions.map((sugg) => (
                     <li
                       key={sugg.id}
                       onClick={() => {
                         setSelectedPlace(sugg);
                         setLocation(sugg.place_name);
                         setSuggestions([]);
                       }}
                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                     >
                       {sugg.place_name}
                     </li>
                   ))}
                 </ul>
               )}
               <p className="text-sm text-gray-500 mt-2">* Selecting a location updates the live preview.</p>
             </div>
           </div>
         </section>
   
         {/* Section 2: Design Options */}
         <section className="bg-white border-t py-16 px-4 sm:px-6 lg:px-8">
           <h2 className="text-2xl font-semibold mb-4">Design Options</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {['streets', 'light', 'dark', 'satellite'].map((style) => (
               <button
                 key={style}
                 onClick={() => setTheme(style)}
                 className={`aspect-square rounded flex items-center justify-center text-sm font-medium border ${theme === style ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
               >
                 {style.charAt(0).toUpperCase() + style.slice(1)}
               </button>
             ))}
           </div>
   
           <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
             <select
               value={orientation}
               onChange={(e) => setOrientation(e.target.value)}
               className="border px-4 py-2 rounded"
             >
               <option value="portrait">Portrait</option>
               <option value="landscape">Landscape</option>
             </select>
   
             <select
               value={size}
               onChange={(e) => setSize(e.target.value)}
               className="border px-4 py-2 rounded"
             >
               <option>A4</option>
               <option>A3</option>
               <option>A2</option>
               <option>30x40cm</option>
             </select>
           </div>
         </section>
   
         {/* Section 3: Text Personalization */}
         <section className="py-16 px-4 sm:px-6 lg:px-8">
           <h2 className="text-2xl font-semibold mb-4">Personalize Your Text</h2>
           <div className="grid gap-4 max-w-xl">
             <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Main title (e.g. New York City)"
               className="border px-4 py-2 rounded w-full"
             />
             <input
               type="text"
               value={subtitle}
               onChange={(e) => setSubtitle(e.target.value)}
               placeholder="Subtitle (e.g. Where we first met)"
               className="border px-4 py-2 rounded w-full"
             />
             <input
               type="text"
               value={caption}
               onChange={(e) => setCaption(e.target.value)}
               placeholder="Date or Custom Caption"
               className="border px-4 py-2 rounded w-full"
             />
           </div>
         </section>
   
         {/* Section 4: Frame and Add-ons */}
         <section className="bg-white border-t py-16 px-4 sm:px-6 lg:px-8">
           <h2 className="text-2xl font-semibold mb-4">Frame and Extras</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
             {['none', 'natural wood', 'black frame'].map((opt) => (
               <button
                 key={opt}
                 onClick={() => setFrame(opt)}
                 className={`aspect-[4/5] rounded flex items-center justify-center border text-center font-medium text-sm px-4 py-2 ${frame === opt ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
               >
                 {opt}
               </button>
             ))}
           </div>
         </section>
   
         {/* Section 5: Add to Cart */}
         <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-2xl font-semibold mb-4">Ready to Order?</h2>
           <p className="text-gray-600 mb-6">You’ll see your final map preview and all selections below.</p>
           <button
             onClick={handleAddToCart}
             className="bg-black text-white px-8 py-3 rounded-md text-lg hover:bg-gray-800 transition"
           >
             Add to Cart
           </button>
         </section>
   
         {/* Cart Preview */}
         {cart.length > 0 && (
           <section className="bg-white border-t py-16 px-4 sm:px-6 lg:px-8">
             <h2 className="text-xl font-semibold mb-4">🛒 Cart Preview</h2>
             <ul className="space-y-6">
               {cart.map((item, index) => (
                 <li key={index} className="border rounded-lg p-6 bg-gray-50">
                   <p><strong>Location:</strong> {item.location}</p>
                   <p><strong>Title:</strong> {item.title}</p>
                   <p><strong>Subtitle:</strong> {item.subtitle}</p>
                   <p><strong>Caption:</strong> {item.caption}</p>
                   <p><strong>Theme:</strong> {item.theme}</p>
                   <p><strong>Size:</strong> {item.size}</p>
                   <p><strong>Orientation:</strong> {item.orientation}</p>
                   <p><strong>Frame:</strong> {item.frame}</p>
                   <img src={item.previewUrl} className="w-full mt-4 rounded border" />
                 </li>
               ))}
             </ul>
           </section>
         )}
       </div>
     );
   }
   