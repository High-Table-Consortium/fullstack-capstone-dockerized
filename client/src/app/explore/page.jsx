import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Compass, Utensils, Tent, Camera, Palmtree, Mountain } from "lucide-react"
import Navbar from "../../components/Navbar"
import FooterComponent from "../../components/Footer";

export default function ExplorePage() {
  return (
    <div className="">
      <Navbar />
      <div className="bg-wheat container mx-auto px-4 py-8">
        {/* Places You May Like Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Places you may like</h2>
          <div className="w-full overflow-x-auto whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {[
                "Cape Town",
                "Johannesburg",
                "Bloemfontein",
                "Durban",
                "Port Elizabeth",
                "Pretoria",
              ].map((city) => (
                <div
                  key={city}
                  className="w-[250px] shrink-0 bg-white shadow-lg rounded-lg"
                >
                  <div className="p-0">
                    <Image
                      src={`/placeholder.svg?height=200&width=250&text=${city}`}
                      alt={city}
                      width={250}
                      height={200}
                      className="rounded-t-lg object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{city}</h3>
                    <p className="text-sm text-gray-500">
                      Explore the beauty of {city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Explore Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Adventure", icon: Compass },
              { name: "Cuisine", icon: Utensils },
              { name: "Camping", icon: Tent },
              { name: "Photography", icon: Camera },
              { name: "Beach", icon: Palmtree },
              { name: "Hiking", icon: Mountain },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white hover:bg-gray-100 transition-colors p-4 shadow-lg rounded-lg flex justify-between items-center"
              >
                <h3 className="text-sm font-medium">{category.name}</h3>
                <category.icon className="h-4 w-4 text-gray-500" />
                <Link
                  href="#"
                  className="ml-4 text-sm text-gray-500 hover:underline"
                >
                  Explore {category.name}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Cities in South Africa Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Cities in South Africa</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {[
              "Cape Town",
              "Johannesburg",
              "Bloemfontein",
              "Durban",
              "Port Elizabeth",
              "Pretoria",
            ].map((city) => (
              <div
                key={city}
                className="w-[200px] shrink-0 bg-white shadow-lg rounded-lg"
              >
                <div className="p-0">
                  <Image
                    src={`/placeholder.svg?height=150&width=200&text=${city}`}
                    alt={city}
                    width={200}
                    height={150}
                    className="rounded-t-lg object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium">{city}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    Explore <ChevronRight className="h-4 w-4 ml-1" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <FooterComponent/>
    </div>
  );
}
