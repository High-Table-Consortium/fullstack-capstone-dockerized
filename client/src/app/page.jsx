'use client'

import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import Image from "next/legacy/image";
import Link from 'next/link';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Searchbar from "../components/Searchbar";
import { ChevronRight, Calendar, Users, MapPin, Search, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";
import { getAttractions } from '../app/API/api';
import FooterComponent from '../components/Footer';
import Categories from '../components/Categorycards';
import Map from '../components/Map';
import Cities from '../components/Cities';
import Facts from '../components/Facts';
import { Chatbot } from "../components/Chatbot";
import Pagination from "../components/Pagination";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setIsVisible(true);
    const fetchDestinations = async () => {
      try {
        const data = await getAttractions();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchDestinations();
  }, []);

  // Filter destinations based on search term
  const filteredDestinations = useMemo(() => destinations.filter(dest =>
    (dest.title && dest.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (dest.description && dest.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (dest.location && dest.location.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [destinations, searchTerm]);

  const indexOfLastDestination = currentPage * itemsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - itemsPerPage;
  const currentDestinations = useMemo(() => {
    const indexOfLastDestination = currentPage * itemsPerPage;
    const indexOfFirstDestination = indexOfLastDestination - itemsPerPage;
    return filteredDestinations.slice(indexOfFirstDestination, indexOfLastDestination);
  }, [filteredDestinations, currentPage, itemsPerPage]);
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage) || 1;

  // Debugging logs to verify the data slice
  // console.log("Filtered Destinations:", filteredDestinations);
  // console.log("Current Destinations (Page Data):", currentDestinations);
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      // console.log("Next Page:", currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      // console.log("Previous Page:", currentPage - 1);
    }
  };

  // console.log({
  //   currentPage,
  //   totalPages,
  //   itemsPerPage,
  //   displayedItems: currentDestinations.length
  // });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center">
          <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">
              Ready to start your <span className="text-yellow-500">South African</span><br />
              <span className="text-yellow-600">Wonderful Journey</span> with us
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">
              Explore South Africa's wild and beautiful landscapes for a once-in-a-lifetime trip.
            </p>
            <div className="max-w-md mx-auto mb-8">
              <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </motion.div>
        </section>

        {/* Recommended Destinations */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular <span className="text-yellow-600">Destinations</span></h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore South Africa&apos;s most beloved locations, from stunning natural wonders to vibrant cultural sites
              </p>
            </motion.div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[55px]">
              {destinations.slice(0, 8).map((destination, index) => (
                <Link href={`/destination/${destination._id}`} key={index} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <div className="relative h-48">
                          <Image
                            src={destination.image}
                            alt={destination.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col flex-grow">

                        <CardTitle className="text-lg mb-2">{destination.name}</CardTitle>
                        <p className="text-sm text-gray-600 mb-4 overflow-hidden line-clamp-3">
                          {destination.description}
                        </p>
                        <div className="mt-auto">
                          <div className="flex items-center space-x-1 mb-4">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {destination.location}
                            </span>
                          </div>
                          <div className="flex items-center justify-end">
                            <Button 
                              variant="outline" 
                              className="text-yellow-500 border-yellow-600 hover:bg-blue-50 transition-colors"
                            >
                              Explore
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentDestinations.map((destination, index) => (
                <Link href={`/destination/${destination._id}`} key={index} className="h-full">

                  <motion.div
                    key={destination._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card group cursor-pointer"
                  >
                    <div className="relative h-64">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{destination.location}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={handlePrev}
              onNext={handleNext}
              onPageChange={(page) => setCurrentPage(page)}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              totalItems={filteredDestinations.length}
            />
          </div>
        </section>

        <section>
          <Categories />
        </section>
        <section>
          <Cities />
        </section>
        <section>
          <Facts />
        </section>
        <section>
          <Map />
        </section>

        {/* Travel Dream Board Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-4 text-green-900 font-mono">
              You have to <span className="text-yellow-500">spend time to make time</span>
            </h2>
            <p className="mb-8 ml-10 font-semibold text-gray-600">
              A journey starts with a dream…and a plan. You're just 3 easy (and fun) steps away from creating your ideal Travel Dream Board.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Step 1:", description: "Choose a city or province in South Africa to explore.", image: "/green-city.png" },
                { title: "Step 2:", description: "Decide who are your travel companions.", image: "/family.png" },
                { title: "Step 3:", description: "Tick off your bucket list must-dos.", image: "/task-list.png" }
              ].map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image src={reason.image} alt={reason.title} width={32} height={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Chatbot and Footer */}
        <Chatbot />
      </main>
      <FooterComponent />
    </div>
  );
}
