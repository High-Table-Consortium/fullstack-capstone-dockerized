import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Github, Linkedin } from 'lucide-react'
import Navbar from '../../components/Navbar'
import FooterComponent from '../../components/Footer'

export default function AboutUs() {
  const members = [
    {
      id: 1,
      name: "Ntokozo Nkosi",
      email: "nkosintokozot@gmail.com",
      photo: "/ntokozo.jpg",
      github: "https://github.com/NtokozoMitchell",
      linkedin: "https://www.linkedin.com/in/ntokozo-nkosi-966150298/",
      jobTitle: "Full Stack  Developer",
    },
    {
      id: 2,
      name: "Tumelo Selepe",
      email: "tumelothinane13@gmail.com",
      photo: "/.jpg",
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
      photo: "/wesley.jpg",
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
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-[400px] mb-12">
          <Image
            src="https://assets.kerzner.com/api/public/content/394cbb45600c4c6999971173696aca80?v=26230fe8&t=w2880"
            alt="Beautiful tourist destination"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Discover the <span className=' text-green-900'>World</span> with <span className='text-yellow-500'>MeeGuide</span></h1>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl text-green-900 font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-black">
            We aim to make travel planning easy by providing detailed and personalized recommendations for tourist attractions,
            empowering travelers to create unforgettable experiences.
          </p>
        </section>

        {/* Who We Are */}
        <section className="container mx-auto py-8">
          <h1 className="text-3xl text-green-900 font-bold mb-6 text-center">The Team</h1>
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
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Our Story</h2>
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
                MeeGuide was born from our own travel frustrations. As avid travelers, we often found ourselves overwhelmed
                by the sheer number of attractions and the lack of personalized recommendations. We decided to combine our
                love for travel with cutting-edge technology to create a platform that simplifies travel planning and enhances
                the exploration experience.
              </p>
              <p className="text-black">
                Today, we're proud to help millions of travelers discover and enjoy the world's most amazing attractions.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Our Core Values</h2>
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
          <h2 className="text-3xl text-green-900 font-bold mb-4">Ready to <span className='text-yellow-500'>Explore?</span></h2>
          <p className="text-xl text-black mb-6">
            Start your journey with MeeGuide and discover amazing attractions tailored just for you.
          </p>
          <Link href="/explore" className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-900 transition duration-300">
            Get Started
          </Link>
        </section>

        {/* Contact Information */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-4">We'd love to hear from you!</p>
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
