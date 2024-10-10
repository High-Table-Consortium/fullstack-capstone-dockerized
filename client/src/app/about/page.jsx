import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'
import Navbar from '../../components/Navbar'

export default function AboutUs() {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-[400px] mb-12">
          <Image
            src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80"
            alt="Beautiful tourist destination"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Discover the World with MeeGuide</h1>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600">
            We aim to make travel planning easy by providing detailed and personalized recommendations for tourist attractions,
            empowering travelers to create unforgettable experiences.
          </p>
        </section>

        {/* Who We Are */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Who We Are</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Nkosi Ntokozo", role: "Full-Stack Developer", image: "/placeholder.svg?height=150&width=150" },
              { name: "Phamela Mhlaba", role: "Full-Stack Developer", image: "/placeholder.svg?height=150&width=150" },
              { name: "Wesley Mutyamizi", role: "Full-Stack Developer", image: "/placeholder.svg?height=150&width=150" },
              { name: "Tumelo Selepe ", role: "Full-Stack Developer ", image: "/placeholder.svg?height=150&width=150" }
            ].map((member) => (
              <div key={member.name} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How We Help Travelers */}
        <section className="mb-12 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">How We Help Travelers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Personalized Recommendations", description: "AI-powered suggestions tailored to your preferences" },
              { title: "Real-time Guides", description: "Up-to-date information on attractions, including wait times and best visiting hours" },
              { title: "User Reviews", description: "Honest feedback from fellow travelers to help you make informed decisions" }
            ].map((service) => (
              <div key={service.title} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <Image
                src="/height=300&width=400"
                alt="Founders on a trip"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-600 mb-4">
                MeeGuide was born from our own travel frustrations. As avid travelers, we often found ourselves overwhelmed
                by the sheer number of attractions and the lack of personalized recommendations. We decided to combine our
                love for travel with cutting-edge technology to create a platform that simplifies travel planning and enhances
                the exploration experience.
              </p>
              <p className="text-gray-600">
                Today, we're proud to help millions of travelers discover and enjoy the world's most amazing attractions.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "Adventure", description: "Encouraging exploration and new experiences" },
              { value: "Sustainability", description: "Promoting responsible and eco-friendly travel" },
              { value: "Cultural Appreciation", description: "Fostering understanding and respect for local cultures" },
              { value: "Innovation", description: "Continuously improving our technology to serve travelers better" }
            ].map((item) => (
              <div key={item.value} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{item.value}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl text-gray-600 mb-6">
            Start your journey with MeeGuide and discover amazing attractions tailored just for you.
          </p>
          <Link href="/explore" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Get Started
          </Link>
        </section>

        {/* Contact Information */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-4">We'd love to hear from you!</p>
          <div className="flex justify-center space-x-6">
            <Link href="mailto:info@meeguide.com" className="text-gray-600 hover:text-blue-600">
              <Mail className="w-8 h-8" />
            </Link>
            <Link href="https://facebook.com/meeguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
              <Facebook className="w-8 h-8" />
            </Link>
            <Link href="https://instagram.com/meeguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
              <Instagram className="w-8 h-8" />
            </Link>
            <Link href="https://twitter.com/meeguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
              <Twitter className="w-8 h-8" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
