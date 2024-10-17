'use client'

import Image from "next/image"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import FooterComponent from "../../components/Footer";
import Cities from "../../components/Cities";
import Categories from "../../components/Categorycards";
import Provinces from "../../components/Provinces";
import { motion } from 'framer-motion'
import { useState, useEffect } from "react";

export default function ExplorePage() {
  const [isVisible, setIsVisible] = useState(false)

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
  return (
    <div>
      <Navbar />
        <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/balloons.mp4" type="video/mp4" />
        </video>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">
              Discover <span className="text-yellow-600">South Africa's</span> iconic destinations.
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">WHERE LUXURY INTERTWINES SEAMLESSLY WITH THRILLING ESCAPADES</p>
            <div className="max-w-md mx-auto mb-8"> 
            </div>
          </motion.div>
        </section>
      <div className="bg-background container mx-auto px-4 py-8">

        <section className="mb-10  text-gray-600 p-7">
        <h2 className="text-3xl md:text-2xl text-green-900 font-bold mb-5 font-serif">JOURNEY THROUGH THE HEART OF SOUTH AFRICA</h2>
          <p>As a country of striking diversity, South Africa offers a captivating blend of natural beauty, rich culture, and vibrant cities. From the vast savannahs of the Kruger National Park teeming with wildlife to the majestic peaks of the Drakensberg mountains and the stunning coastline along the Garden Route, South Africa's landscapes are as varied as they are breathtaking.
            <br /> <br />Cape Town, with its iconic Table Mountain and vibrant waterfront, lures visitors with its cosmopolitan charm, while Johannesburg pulses with the energy of a modern metropolis. South Africans, known for their warmth and resilience, take great pride in their history and traditions, making every encounter with the people as memorable as the places.
           <br /><br /> The country's nine provinces each offer a unique cultural experience, from the heart of the Zulu kingdom in KwaZulu-Natal to the vineyards of the Western Cape, ensuring that every journey is rich with diversity.
          </p>
        </section>
        
        <section className="mb-12">
          <Categories />
        </section>

        <section>
          <Provinces />
        </section>

        <section>
          <Cities />
        </section>
      </div>
      <FooterComponent/>
    </div>
  );
}
