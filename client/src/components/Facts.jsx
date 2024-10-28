'use client'
import React from "react";
import translations from '../../public/locales/en/common.json';


const southAfricaFacts = [
     translations["home-page"].text3,
     translations["home-page"].text7,
    "The world's largest diamond was found in South Africa in 1905.",
    translations["home-page"].text5,
    translations["home-page"].text6,
    "South Africa has the longest wine route in the world, Route 62.",
    "The country is home to the oldest meteor scar in the world, called the Vredefort Dome.",
    translations["home-page"].text8,
    "The country has the third highest level of biodiversity in the world.",
    translations["home-page"].text4,,
    "Just like the UK, Australia and New Zealand, South Africa drives on the left side of the road",
    "The first ever heart transplant was performed in South Africa in 1957 ",
    "South Africa’s national animal is the springbok",
    "The country has hosted a trifecta of world cups"
  ];
  
  export default function Facts() {
    // Shuffle and slice the array to get 6 random facts
    const randomFacts = southAfricaFacts.sort(() => 0.5 - Math.random()).slice(0, 6);
  
    return (
      <div className="container mx-auto p-4 rounded-md bg-[url('https://cdn.britannica.com/27/4227-050-00DBD10A/Flag-South-Africa.jpg')] bg-cover bg-center"
      style={{ minHeight: "100vh" }} >
        <h2 className="text-4xl font-bold mb-12 p-6 text-center text-green-900">Fun Facts About <span className="text-yellow-400">South Africa</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {randomFacts.map((fact, index) => (
            <div key={index} className="border p-4 rounded-lg shadow h-full bg-green-950">
              <h3 className="text-lg font-bold mb-2 text-yellow-500">Fact #{index + 1}</h3>
              <p className="text-white">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  