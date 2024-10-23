'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAttractionByCategory } from '../../../API/api';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import FooterComponent from '../../../../components/Footer';

export default function DestinationList({ params }) {
  const router = useRouter();
  const { category } = params;

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchDestinations = async (pageNumber) => {
    setLoading(true);
    try {
      const data = await getAttractionByCategory(category);
      if (pageNumber === 1) {
        setDestinations(data);
      } else {
        setDestinations((prev) => [...prev, ...data]);
      }
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      setPage(1);
      fetchDestinations(1);
    }
  }, [category]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDestinations(nextPage);
  };
  
  // Function to extract the first sentence from the description
  const getFirstSentence = (description) => {
    return description.split('. ')[0] + '.';
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`relative overflow-hidden rounded-lg group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : 
                index === 1 ? 'md:col-span-1 md:row-span-1' : 
                index === 2 ? 'md:col-span-1 md:row-span-2' : 
                index === 3 ? 'md:col-span-1 md:row-span-1' : 
                index === 4 ? 'md:col-span-2 md:row-span-1' : 
                index === 5 ? 'md:col-span-1 md:row-span-1' : ''
              }`}>
              <Image
                src={destination.image}
                alt={destination.name}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                {/* Hover description with the first sentence */}
                <h3 className='text-white text-sm hidden group-hover:block'>
                  {getFirstSentence(destination.description)}
                </h3>
                <h2 className="text-white text-lg font-semibold mb-2">
                  {destination.name}
                </h2>
                <button
                  className="self-start text-white border border-white hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-colors p-2 rounded"
                  onClick={() => router.push(`/destination/${destination.id}`)}
                >
                  Discover
                </button>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
        )}

        {!loading && hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="p-2 bg-green-900 text-white rounded hover:bg-yellow-500 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}

