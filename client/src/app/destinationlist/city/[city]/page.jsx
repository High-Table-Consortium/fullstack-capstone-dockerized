'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAttractionByCity } from '../../../API/api';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import FooterComponent from '../../../../components/Footer';

export default function DestinationList({ params }) {
  const router = useRouter();
  const { city } = params;

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 7;

  const fetchDestinations = async (pageNumber) => {
    setLoading(true);
    try {
      const data = await getAttractionByCity(city);
      const slicedData = pageNumber === 1 
        ? data.slice(0, ITEMS_PER_PAGE) 
        : data.slice(ITEMS_PER_PAGE * (pageNumber - 1), ITEMS_PER_PAGE * pageNumber);
      
      if (pageNumber === 1) {
        setDestinations(slicedData);
      } else {
        setDestinations((prev) => [...prev, ...slicedData]);
      }
      setHasMore(data.length > ITEMS_PER_PAGE * pageNumber);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      setPage(1);
      fetchDestinations(1);
    }
  }, [city]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDestinations(nextPage);
  };

  const getFirstSentence = (description) => {
    return description.split('. ')[0] + '.';
  };

  const handleDestinationClick = (destinationId) => {
    router.push(`/destination/detail/${destinationId}`);
  };

  const getLayoutClass = (index) => {
    const position = index % 7;
    
    switch (position) {
      case 0:
        return 'col-span-4 row-span-2';
      case 1:
        return 'col-span-2 row-span-1';
      case 2:
        return 'col-span-2 row-span-2';
      case 3:
        return 'col-span-2 row-span-1';
      case 4:
        return 'col-span-2 row-span-1';
      case 5:
        return 'col-span-3 row-span-1';
      case 6:
        return 'col-span-3 row-span-1';
      default:
        return 'col-span-3 row-span-1';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-6 gap-4 auto-rows-[200px]">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`relative overflow-hidden rounded-lg group transition-transform duration-300 hover:scale-[1.02] cursor-pointer ${getLayoutClass(index)}`}
              onClick={() => {
                router.push(`/destination/${destination._id}`);
              } }
            >
              <Image
                src={destination.image}
                alt={destination.name}
                width={1200}
                height={800}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:to-black/80 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="space-y-2">
                    <h3 className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {getFirstSentence(destination.description)}
                    </h3>
                    <h2 className="text-white text-xl font-semibold">
                      {destination.name}
                    </h2>
                    <button
                      className="mt-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
                    >
                      View Experience
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-3 bg-green-950 text-white rounded-full hover:bg-yellow-500 transition-colors duration-300 disabled:opacity-50"
            >
              Load More Destinations
            </button>
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}