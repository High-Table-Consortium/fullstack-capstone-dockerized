'use client'

import { useState, useEffect } from 'react'
import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Searchbar from "../components/Searchbar"
import { Input } from "../components/ui/input"
import { ChevronRight, Calendar, Users, MapPin, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from "../components/Navbar";
import { getAttractions } from './API/api'
import FooterComponent from '../components/Footer'
import Categories from '../components/Categorycards';
import Map from '../components/Map'
import Cities from '../components/Cities'
export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeIndex, setActiveIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);


  useEffect(() => {
    setIsVisible(true)

    const fetchDestinations = async () => {
      try {
        const data = await getAttractions();
        setDestinations(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, [])

  const recommendedDestinations = [
    {
      title: "Table Mountain",
      description: "Iconic flat-topped mountain with stunning views of Cape Town",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_WMMhbPwXDzmtzcKUxE3m4wLxxx3KhW7EKA&s",
      location: "Cape Town"
    },
    {
      title: "Kruger National Park",
      description: "World-renowned wildlife reserve offering incredible safari experiences",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZP0B018XBYNwIJi39rVk9j0SCM-uPyWgX3A&s",
      location: "Limpopo and Mpumalanga"
    },
    {
      title: "Garden Route",
      description: "Scenic stretch of coastline with diverse landscapes and activities",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6qfiWdkpuRWcQiDnR-Lc5WoNBGuOOFrLNA&s",
      location: "Western and Eastern Cape"
    },
    {
      title: "Robben Island",
      description: "Historic prison island where Nelson Mandela was incarcerated",
      image: "https://www.winetourscapetown.com/images/tours/cape-winelands-tour.jpg",
      location: "Cape Town"
    }
  ]

  const filteredDestinations = recommendedDestinations.filter(dest =>
    dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      <Navbar />

      <main className="flex-grow">
        {/* Carousal section */}
        
        {/* carousal end */}
        <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/57b9b98a29687f1ef5c622df/1478273230409-FGHP1T1WJR1OAMAHG6AB/00.jpg?format=1500w')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to start your <span className="text-yellow-500">South African</span><br />
              <span className="text-yellow-600">Wonderful Journey</span> with us
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">Explore South Africa's wild and beautiful landscapes for a once-in-a-lifetime trip for you</p>
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-4xl">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-auto flex-grow flex items-center space-x-2 border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-4">
                  <Calendar className="text-gray-400" />
                  <input type="text" className="flex-grow p-2" placeholder="Choose a date" />
                </div>
                <div className="w-full md:w-auto flex-grow flex items-center space-x-2 border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-4">
                  <Users className="text-gray-400" />
                  <select className="flex-grow p-2 bg-white">
                    <option>Select Passengers</option>
                  </select>
                </div>
                <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-8 transition-colors">Check Availability</Button>
              </div>
            </div>
          </motion.div>
        </section>
        
        <section className="py-2">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-2">
              Recommended <span className="text-yellow-500">Destinations</span>
            </h2>
            <p className="text-center text-gray-600 mb-8">Discover South Africa's Most Popular Tourist Attractions</p>
            <div className="max-w-md mx-auto mb-8">
                <Searchbar />  
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[55px]">
              {destinations.map((destination, index) => (
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
                        <p className="text-sm text-gray-600 mb-4 overflow-hidden line-clamp-3">{destination.description}</p>
                        <div className="mt-auto">
                          <div className="flex items-center space-x-1 mb-4">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{destination.location}</span>
                          </div>
                          <div className="flex items-center justify-end">
                            <Button variant="outline" className="text-yellow-500 border-yellow-600 hover:bg-blue-50 transition-colors">
                              Explore
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <Categories/>
        </section>

        <section>
          <Cities/>
        </section>

        <section>
          <Map />
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Why should Trip <span className="text-yellow-500">With Us?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                // { title: "Best Price Guarantee", description: "We offer competitive prices for all our South African adventures." },
                // { title: "Easy & Quick Booking", description: "Our streamlined process makes booking your trip a breeze." },
                { title: "Customer Care 24/7", description: "Our support team is always available to assist you.", image: "https://cdn-icons-png.flaticon.com/512/10342/10342464.png" }
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
        
      </main>
      <FooterComponent />
    </div>
  )
}