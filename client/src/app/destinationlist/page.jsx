import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function DestinationList({ categoryTitle, destinations }) {
  const [savedDestinations, setSavedDestinations] = useState([]);

  const toggleSave = (id) => {
    setSavedDestinations((prev) =>
      prev.includes(id) ? prev.filter((destId) => destId !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{categoryTitle}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <div key={destination.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <button
              className={`absolute top-2 right-2 rounded-full p-0 w-10 h-10 flex items-center justify-center ${
                savedDestinations.includes(destination.id)
                  ? 'bg-gray-200 text-gray-900'
                  : 'bg-transparent border border-gray-300 text-gray-600'
              }`}
              onClick={() => toggleSave(destination.id)}
            >
              <Heart
                className={`h-5 w-5 ${savedDestinations.includes(destination.id) ? 'fill-current' : ''}`}
              />
              <span className="sr-only">
                {savedDestinations.includes(destination.id) ? 'Unsave' : 'Save'}
              </span>
            </button>
            <div className="p-4">
              <h2 className="text-xl font-bold">{destination.name}</h2>
              <p className="text-sm text-gray-500">{destination.location}</p>
            </div>
            <div className="p-4 pt-0">
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{destination.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(destination.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// "use client"

// import { useState } from 'react';
// import { Heart } from 'lucide-react';
// import Pagination from '@/components/Pagination';

// const destinations = [
//   { id: 1, name: "Cape Town", location: "Western Cape", rating: 4.8, image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80" },
//   { id: 2, name: "Kruger National Park", location: "Limpopo & Mpumalanga", rating: 4.9, image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800&q=80" },
//   { id: 3, name: "Durban", location: "KwaZulu-Natal", rating: 4.5, image: "https://images.unsplash.com/photo-1634392885534-7cd69e1d5c95?w=800&q=80" },
//   { id: 4, name: "Johannesburg", location: "Gauteng", rating: 4.3, image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&q=80" },
//   { id: 5, name: "Garden Route", location: "Western & Eastern Cape", rating: 4.7, image: "https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?w=800&q=80" },
//   { id: 6, name: "Drakensberg Mountains", location: "KwaZulu-Natal", rating: 4.6, image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&q=80" },
//   { id: 7, name: "Blyde River Canyon", location: "Mpumalanga", rating: 4.5, image: "https://images.unsplash.com/photo-1612442443445-009c4a5c10ee?w=800&q=80" },
//   { id: 8, name: "Addo Elephant National Park", location: "Eastern Cape", rating: 4.7, image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80" },
//   { id: 9, name: "Stellenbosch", location: "Western Cape", rating: 4.6, image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&q=80" },
// ];

// export default function Destinationlist() {
//   const [savedDestinations, setSavedDestinations] = useState([]);

//   const toggleSave = (id) => {
//     setSavedDestinations((prev) =>
//       prev.includes(id) ? prev.filter((destId) => destId !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">South African Destinations</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {destinations.map((destination) => (
//           <div key={destination.id} className="border rounded-lg overflow-hidden relative">
//             <img
//               src={destination.image}
//               alt={destination.name}
//               className="w-full h-48 object-cover"
//             />
//             <button
//               className={`absolute top-2 right-2 rounded-full p-0 w-10 h-10 flex items-center justify-center ${
//                 savedDestinations.includes(destination.id)
//                   ? 'bg-gray-200 text-gray-700'
//                   : 'bg-white text-gray-500 border border-gray-300'
//               }`}
//               onClick={() => toggleSave(destination.id)}
//             >
//               <Heart
//                 className={`h-5 w-5 ${
//                   savedDestinations.includes(destination.id) ? 'fill-current text-red-500' : ''
//                 }`}
//               />
//               <span className="sr-only">
//                 {savedDestinations.includes(destination.id) ? 'Unsave' : 'Save'}
//               </span>
//             </button>
//             <div className="p-4">
//               <h2 className="text-xl font-bold">{destination.name}</h2>
//               <p className="text-sm text-gray-500">{destination.location}</p>
//               <div className="mt-2 flex items-center">
//                 <span className="text-2xl font-bold mr-2">{destination.rating}</span>
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <svg
//                       key={i}
//                       className={`w-5 h-5 ${
//                         i < Math.floor(destination.rating)
//                           ? 'text-yellow-400'
//                           : 'text-gray-300'
//                       }`}
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Pagination totalPages={Math.ceil(destinations.length / 9)} />
//     </div>
//   );
// }
