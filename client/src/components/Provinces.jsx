"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/legacy/image';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import Router from 'next/navigation';
import Link from 'next/link';

const Provinces = () => {
    const [isVisible, setIsVisible] = useState(false);
    const carouselRef = useRef(null); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500); 

        return () => clearTimeout(timer);
    }, []);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <section className="rounded-2xl bg-background relative">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-2 font-mono">
                        Escape to Our <span className="text-yellow-500">Provinces</span>
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                        Discover the Beauty all nine of our provinces
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
                                { name: "Gauteng", image: "https://south-africa.net/wp-content/uploads/2023/01/gauteng.jpg" },
                                { name: "Western-Cape", image: "https://images.myguide-cdn.com/capetown/companies/customized-private-wine-tour/large/customized-private-wine-tour-3676073.jpg" },
                                { name: "KwaZulu-Natal", image: "https://s43365.pcdn.co/wp-content/uploads/2021/07/kzn-KwaZulu-Natal-iStock-.jpg" },
                                { name: "Eastern-Cape", image: "https://satmedia.azureedge.net/satcache/4/2/d/0/c/b/42d0cbc199ebd637301ee0da123994a2ac41a578.jpg" },
                                { name: "Free-State", image: "https://averagesouthafrican.com/wp-content/uploads/2016/09/img_6104.jpg?w=584" },
                                { name: "Mpumalanga", image: "https://lh3.googleusercontent.com/rLRDgUAuj26GvPg7N5U97lbG8Younb1C-6EqQ1bbZZlhx0Lg3Md-ZvTH8-1X1jyBf_iLQg1UfSUX83KzNR1Ev9yRYyqBtH58Rw=s1500" },
                                { name: "North-West", image: "https://daddysdeals.co.za/wp-content/uploads/2022/06/activities-in-hartbeerspoort.webp" },
                                { name: "Limpopo", image: "https://www.railbookers.ca/sites/railbookers/files/styles/hero/public/media/images/kruger-national-park_big-5_web_786552829.jpeg?h=73545cb6&itok=XFxbOQ46" },
                                { name: "Northern-Cape", image: "https://www.wineenthusiast.com/wp-content/uploads/2021/05/SOCIAL_Fallback_A_Fynbos_Pincussion_Protea_at_Cape_Point_Vineyards_WOSA_Pierre_van_der_Spuy_1920x1280.jpg" },
                            ].map((province, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex-shrink-0 w-64"
                                >
                                    <Link href={`/destinationlist/province/${province.name}`}>
                                    
                                    <div className="overflow-hidden rounded-lg shadow-lg">
                                        <div className="relative aspect-[3/2]">
                                            <Image
                                                src={province.image}
                                                alt={`${province.name} city`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-300 hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-30">
                                                <h3 className="text-white text-2xl font-bold text-center px-4 font-serif">{province.name}</h3>
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

export default Provinces;