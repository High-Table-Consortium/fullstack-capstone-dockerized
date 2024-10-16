"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons from lucide-react
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Cities = () => {
    const [isVisible, setIsVisible] = useState(false);
    const carouselRef = useRef(null); // Ref to the carousel div
    const router = useRouter(); 
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500); // Adjust this delay as necessary

        return () => clearTimeout(timer); // Clean up the timeout on unmount
    }, []);

    // Function to scroll left
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handleGoToCity = (city) => {
        router.push(``,);
    }
    return (
        <div>
            <section className="pt-5 rounded-2xl bg-background relative">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-2 font-mono">
                        Escape to Our <span className="text-yellow-500">Favorite Cities</span>
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                        Discover the Beauty of South Africa's Most Popular Tourist Spots
                    </p>

                    {/* Carousel container */}
                    <div className="relative flex items-center">
                        {/* Left arrow outside the carousel */}
                        <button
                            className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-yellow rounded-full shadow-lg"
                            onClick={scrollLeft}
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Carousel */}
                        <div
                            ref={carouselRef}
                            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
                        >
                            {[
                                { name: "Cape Town", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_WMMhbPwXDzmtzcKUxE3m4wLxxx3KhW7EKA&s" },
                                { name: "Johannesburg", image: "https://images.squarespace-cdn.com/content/v1/57b9b98a29687f1ef5c622df/1478273230409-FGHP1T1WJR1OAMAHG6AB/00.jpg?format=1500w" },
                                { name: "Durban", image: "https://silversea-discover.imgix.net/2024/01/durbanheroistockphoto.jpg?auto=compress%2Cformat&ixlib=php-3.3.1" },
                                { name: "Port Elizabeth", image: "https://thumbs.dreamstime.com/b/aerial-port-elizabeth-south-africa-view-44811213.jpg" },
                                { name: "Pretoria", image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pretoria_Union_Buildings-001.jpg" },
                                { name: "Bloemfontein", image: "https://south-africa.net/wp-content/uploads/2022/12/bloemfontein.jpg" },
                                { name: "Kimberley", image: "https://tourismkimberley.com/site/assets/files/1933/tk_provided_kimb_hi_res_5018_hdr_rgb.1800x973p52x39.webp" },
                            ].map((city, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex-shrink-0 w-64"
                                >
                                    <Link href={`/destinationlist/city/${city.name}`}>
                                    
                                    <div className="overflow-hidden rounded-lg shadow-lg">
                                        <div className="relative aspect-[3/2]">
                                            <Image
                                                src={city.image}
                                                alt={`${city.name} city`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-300 hover:scale-105"
                                                />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-30">
                                                <h3 className="text-white text-2xl font-bold text-center px-4 font-serif">{city.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                                </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right arrow outside the carousel */}
                        <button
                            className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-yellow rounded-full shadow-lg"
                            onClick={scrollRight}
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cities;

