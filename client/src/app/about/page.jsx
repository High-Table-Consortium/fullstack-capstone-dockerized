'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Github, Linkedin } from 'lucide-react'
import Navbar from '../../components/Navbar'
import FooterComponent from '../../components/Footer'
import { motion } from 'framer-motion'
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
   const { t } = useTranslation();
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


  const members = [
    {
      id: 1,
      name: "Ntokozo Nkosi",
      email: "nkosintokozot@gmail.com",
      photo: "/nto.JPG",
      github: "https://github.com/NtokozoMitchell",
      linkedin: "https://www.linkedin.com/in/ntokozo-nkosi-966150298/",
      jobTitle: "Full Stack  Developer",
    },
    {
      id: 2,
      name: "Tumelo Thinane",
      email: "tumelothinane13@gmail.com",
      photo: "/Tum.JPG",
      github: "https://github.com/Tumelo2748",
      linkedin: "https://www.linkedin.com/in/selepe-thinane/",
      jobTitle: "Full Stack Developer",
    },
    {
      id: 3,
      name: "Phamela Mhlaba",
      email: "phamelamhlaba@gmail.com",
      photo: "/pham.jpg",
      github: "https://github.com/PhamelaMhlaba",
      linkedin: "https://www.linkedin.com/in/phamela-mhlaba-a115961aa/",
      jobTitle: "Full Stack Developer",
    },
    {
      id: 4,
      name: "Wesley Mutyambizi",
      email: "wesleymutyambizi@gmail.com",
      photo: "/wes.JPG",
      github: "https://github.com/thewesss",
      linkedin: "https://www.linkedin.com/in/wesley-mutyambizi",
      jobTitle: "Full Stack Developer",
    },
    {
      id: 5,
      name: "Sharon Matjila",
      email: "Kelebogilematjila23@gmail.com",
      photo: "/sharon.jpg",
      github: "https://github.com/emmag",
      linkedin: "https://linkedin.com/in/emmag",
      jobTitle: "Full Stack Developer",
    },
  ];

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
          <source src="/ct.mp4" type="video/mp4" />
        </video>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">
               {t('about us.Us')} <span className='text-yellow-500'>{t('about us.Us')}</span>.
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">{aboutUs.text1}</p>
            <div className="max-w-md mx-auto mb-8"> 
            </div>
          </motion.div>
        </section>

      <div className="container mx-auto px-4 py-8">
        {/* Mission Statement */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl text-green-900 font-bold mb-4 font-mono">{t('about us.mission')}n</h2>
          <p className="text-xl text-black">
            {t('about us.text2')}
          </p>
        </section>

        {/* Who We Are */}
        <section className="container mx-auto py-8">
          <h1 className="text-3xl text-green-900 font-bold mb-6 text-center font-mono">The Team</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.id} className="flex bg-yellow-50 flex-col p-12 rounded-lg shadow-md">
                <div className="flex-grow">
                  <div className="flex flex-col items-center space-y-4">
                    <img
                      className="w-32 h-32 rounded-full"
                      src={member.photo}
                      alt={member.name}
                    />
                    <div className="text-center">
                      <h2 className="text-xl text-yellow-500 font-semibold">{member.name}</h2>
                      <p className="text-sm py-3 text-green-800">{member.jobTitle}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-2">
                  <a
                    href={`mailto:${member.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-red-600 rounded px-2 py-2 text-sm flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4 text-red-600" />
                    <span>Email</span>
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-blue-950 rounded px-2 py-2 text-sm flex items-center space-x-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-blue-400 rounded px-2 bo py-2 text-sm flex items-center space-x-2"
                  >
                    <Linkedin className="w-4 text-blue-400 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center font-mono">{t('about us.story')}</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <Image
                src="/mg.svg"
                alt="Founders on a trip"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-black mb-4">
                {t('about us.text3')}
              </p>
              <p className="text-black">
                Today, we're proud to help millions of travelers discover and enjoy the world's most amazing attractions.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center font-mono">{t('about us.values')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "Adventure", description: "Encouraging exploration and new experiences" },
              { value: "Sustainability", description: "Promoting responsible and eco-friendly travel" },
              { value: "Cultural Appreciation", description: "Fostering understanding and respect for local cultures" },
              { value: "Innovation", description: "Continuously improving our technology to serve travelers better" }
            ].map((item) => (
              <div key={item.value} className="text-center">
                <h3 className="text-xl text-yellow-500 font-semibold mb-2">{item.value}</h3>
                <p className="text-black">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl text-green-900 font-bold mb-4 font-mono">{t('about us.explore')} <span className='text-yellow-500'>Explore?</span></h2>
          <p className="text-xl text-black mb-6">
           {t('about us.text8')}
          </p>
          <Link href="/explore" className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-900 transition duration-300">
            Get Started
          </Link>
        </section>

        {/* Contact Information */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 font-mono"> {t('about us.get in touch')}</h2>
          <p className="text-xl text-gray-600 mb-4"> {t('about us.text9')}</p>
          <div className="flex justify-center space-x-6">
            <Link href="mailto:info@meeguide.com" className="text-gray-600 hover:text-red-600">
              <Mail className="w-8 h-8" />
            </Link>
            <Link href="https://facebook.com/meeguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
              <Facebook className="w-8 h-8" />
            </Link>
            <Link href="https://instagram.com/meeguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600">
              <Instagram className="w-8 h-8" />
            </Link>
            <Link href="https://twitter.com/meeguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-300">
              <Twitter className="w-8 h-8" />
            </Link>
          </div>
        </section>
      </div>
      <FooterComponent />
    </div>
  )
}
