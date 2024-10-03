// "use client"

// import { useState } from 'react'
// import { ChevronDown, Search, MapPin } from 'lucide-react'

// const HomeP = () => {
//   const [isSignedIn, setIsSignedIn] = useState(false)

//   const categories = [
//     { name: 'Beaches', image: '/placeholder.svg?height=200&width=300' },
//     { name: 'Mountains', image: '/placeholder.svg?height=200&width=300' },
//     { name: 'Wildlife', image: '/placeholder.svg?height=200&width=300' },
//     { name: 'Culture', image: '/placeholder.svg?height=200&width=300' },
//     { name: 'Food', image: '/placeholder.svg?height=200&width=300' },
//     { name: 'Adventure', image: '/placeholder.svg?height=200&width=300' },
//   ]

//   const cities = [
//     { name: 'Cape Town', image: '/placeholder.svg?height=150&width=200' },
//     { name: 'Johannesburg', image: '/placeholder.svg?height=150&width=200' },
//     { name: 'Durban', image: '/placeholder.svg?height=150&width=200' },
//     { name: 'Pretoria', image: '/placeholder.svg?height=150&width=200' },
//     { name: 'Port Elizabeth', image: '/placeholder.svg?height=150&width=200' },
//   ]

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Main Content */}
//       <main className="flex-grow">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold mb-8 text-center">Discover South Africa</h1>

//           {/* Search Bar */}
//           <div className="max-w-md mx-auto mb-12">
//             <div className="relative">
//               <input type="text" placeholder="Search destinations..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg" />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>

//           {/* Carousel */}
//           <div className="mb-12 bg-gray-200 p-4 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">Top Destinations</h2>
//             {/* Add your carousel component here */}
//             <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
//               Carousel Placeholder
//             </div>
//           </div>

//           {/* Categories */}
//           <h2 className="text-2xl font-semibold mb-4">Explore by Category</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//             {categories.map((category, index) => (
//               <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
//                 <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">{category.name}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Map */}
//           <h2 className="text-2xl font-semibold mb-4">Explore South Africa</h2>
//           <div className="mb-12 bg-gray-200 p-4 rounded-lg">
//             <div className="h-96 bg-gray-300 rounded-lg flex items-center justify-center relative">
//               Map Placeholder
//               <MapPin className="absolute text-red-500" style={{ top: '30%', left: '40%' }} />
//               <MapPin className="absolute text-red-500" style={{ top: '50%', left: '60%' }} />
//               <MapPin className="absolute text-red-500" style={{ top: '70%', left: '20%' }} />
//             </div>
//           </div>

//           {/* Cities */}
//           <h2 className="text-2xl font-semibold mb-4">Cities in South Africa</h2>
//           <div className="flex overflow-x-auto space-x-4 pb-4 mb-12">
//             {cities.map((city, index) => (
//               <div key={index} className="flex-shrink-0 border border-gray-300 rounded-lg overflow-hidden w-48">
//                 <img src={city.image} alt={city.name} className="w-full h-32 object-cover" />
//                 <div className="p-2">
//                   <h3 className="text-md font-semibold">{city.name}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default HomeP

"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { ChevronRight, Calendar, Users, MapPin, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from "../../components/Navbar";
import { getAttractions } from '../API/api'
import FooterComponent from '../../components/Footer'
export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [destinations, setDestinations] = useState([]);


  useEffect(() => {
    setIsVisible(true)

    const fetchDestinations = async () => {
      try {
        const data = await getAttractions();
        setDestinations(data.slice(0, 4));
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/placeholder.svg" alt="Logo" width={32} height={32} />
          <span className="text-xl font-semibold">Meeguide</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-sm hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/partners" className="text-sm hover:text-blue-600 transition-colors">Partners</Link>
          <Link href="/faq" className="text-sm hover:text-blue-600 transition-colors">FAQ</Link>
          <Link href="/coupons" className="text-sm hover:text-blue-600 transition-colors">Coupons and Promos</Link>
        </nav>
        <button className="text-blue-600 hover:bg-blue-100 transition-colors">
          Explore Destinations
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </header> */}
      <Navbar />

      <main className="flex-grow">
        <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_WMMhbPwXDzmtzcKUxE3m4wLxxx3KhW7EKA&s')" }}>
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

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-2">
              Recommended <span className="text-yellow-500">Destinations</span>
            </h2>
            <p className="text-center text-gray-600 mb-8">Discover South Africa's Most Popular Tourist Attractions</p>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <div className="relative h-48">
                        <Image src={destination.image} alt={destination.name} layout="fill" objectFit="cover" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2">{destination.name}</CardTitle>
                      <p className="text-sm text-gray-600 mb-4">{destination.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{destination.location}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-end">
                        <Button variant="outline" className="text-yellow-500 border-yellow-600 hover:bg-blue-50 transition-colors">Explore</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-2">
              Explore South African <span className="text-yellow-500">Cities</span>
            </h2>
            <p className="text-center text-gray-600 mb-12">Discover the unique charm and attractions of South Africa's vibrant cities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Cape Town", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_WMMhbPwXDzmtzcKUxE3m4wLxxx3KhW7EKA&s" },
                { name: "Johannesburg", image: "https://images.squarespace-cdn.com/content/v1/57b9b98a29687f1ef5c622df/1478273230409-FGHP1T1WJR1OAMAHG6AB/00.jpg?format=1500w" },
                { name: "Durban", image: "https://silversea-discover.imgix.net/2024/01/durbanheroistockphoto.jpg?auto=compress%2Cformat&ixlib=php-3.3.1" },
                // { name: "Pretoria", image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/63000/63551-Pretoria.jpg" },
                // { name: "Port Elizabeth", image: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210225125147-port-elizabeth-file.jpg" },
                // { name: "Bloemfontein", image: "https://t3.ftcdn.net/jpg/04/00/08/40/360_F_400084086_yHscah1qme9ySCvVOFCLDIQsc4jRenWS.jpg" }
              ].map((city, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <div className="relative aspect-[16/9]">
                        <Image src={city.image} alt={city.name} layout="fill" objectFit="cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
                          <Button variant="secondary" className="text-white bg-transparent border-white hover:bg-white hover:text-black transition-colors">
                            Explore {city.name}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg text-center">{city.name}</CardTitle>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-2">
              Escape to Our <span className="text-yellow-500">Favorite Destination</span>
            </h2>
            <p className="text-center text-gray-600 mb-12">Discover the Beauty of South Africa's Most Popular Tourist Spots</p>
            <div className="flex space-x-6 overflow-x-auto pb-6">
              {[{ name: "Cape Town", image: "" }, { name: "Johannesburg", image: "https://images.squarespace-cdn.com/content/v1/57b9b98a29687f1ef5c622df/1478273230409-FGHP1T1WJR1OAMAHG6AB/00.jpg?format=1500w" }, { name: "Durban", image: "" }, { name: "Port Elizabeth", image: "" }, { name: "Pretoria", image: "" }].map((city, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-64"
                >
                  <Card>
                    <CardHeader className="p-0">
                      <div className="relative h-40">
                        <Image src={city.image} alt={city.name} layout="fill" objectFit="cover" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg">{city.name}</CardTitle>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Why should Trip <span className="text-yellow-500">With Us?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Best Price Guarantee", description: "We offer competitive prices for all our South African adventures." },
                { title: "Easy & Quick Booking", description: "Our streamlined process makes booking your trip a breeze." },
                { title: "Customer Care 24/7", description: "Our support team is always available to assist you." }
              ].map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image src="/placeholder.svg" alt={reason.title} width={32} height={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2023 Meeguide. All rights reserved.</p>
        </div>
      </footer> */}
      <FooterComponent />
    </div>
  )
}