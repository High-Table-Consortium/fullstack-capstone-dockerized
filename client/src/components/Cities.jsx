"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Ensure you're using Next.js's Image component

const Cities = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Set the visibility after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500); // Adjust this delay as necessary

        return () => clearTimeout(timer); // Clean up the timeout on unmount
    }, []);

    return (
        <div>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-2">
                        Escape to Our <span className="text-yellow-500">Favorite Destination</span>
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                        Discover the Beauty of South Africa's Most Popular Tourist Spots
                    </p>
                    <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
                        {[
                            { name: "Cape Town", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_WMMhbPwXDzmtzcKUxE3m4wLxxx3KhW7EKA&s" },
                            { name: "Johannesburg", image: "https://images.squarespace-cdn.com/content/v1/57b9b98a29687f1ef5c622df/1478273230409-FGHP1T1WJR1OAMAHG6AB/00.jpg?format=1500w" },
                            { name: "Durban", image: "https://silversea-discover.imgix.net/2024/01/durbanheroistockphoto.jpg?auto=compress%2Cformat&ixlib=php-3.3.1" },
                            { name: "Port Elizabeth", image: "https://thumbs.dreamstime.com/b/aerial-port-elizabeth-south-africa-view-44811213.jpg" },
                            { name: "Pretoria", image: "https://www.pexels.com/photo/voortrekker-monument-in-pretoria-south-africa-28495868/" },
                            { name: "Bloemfontein", image: "" },
                            { name: "Kimberley", image: "" },
                        ].map((city, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex-shrink-0 w-64"
                            >
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
                                            <h3 className="text-white text-2xl font-bold text-center px-4">{city.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cities;

