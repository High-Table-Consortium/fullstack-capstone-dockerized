'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

const categories = [
  {
    name: "Adventure",
    image: "https://www.andbeyond.com/wp-content/uploads/sites/5/South-Africa-Phinda-Private-Game-Reserve-E-Bike-Sand-Forest_1.jpg"
  },
  {
    name: "Historical",
    image: "https://museumexplorer.co.za/wp-content/uploads/2023/03/Voortrekker-Monument.jpg"
  },
  {
    name: "Nature-Wildlife",
    image: "https://www.lukimbi.com/wp-content/uploads/2020/08/IMG_1859.jpg"
  },
  {
    name: "Entertainment",
    image: "https://www.gauteng.net/wp-content/uploads/2022/04/GRC_Gal18-1.jpg"
  },
  {
    name: "Scenic-View",
    image: "https://www.fodors.com/wp-content/uploads/2019/11/TableMountain101__HERO_shutterstock_165749363.jpg"
  },
  {
    name: "Cuisine",
    image: "https://nomadparadise.com/wp-content/uploads/2020/04/sa-food-005-1024x640.jpg"
  },
]

export default function Categories() {
  const router = useRouter(); 
  
  const handleCategoryClick = (category) => {
    router.push(`/destinationlist/category/${category}`); 
  }

  return (
    <section className="w-full rounded-2xl py-5 bg-background">
      <div className="container mx-auto px-4 mt=[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="overflow-hidden rounded-lg shadow-2xl shadow-yellow-100 cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={category.image}
                  alt={`${category.name} category`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-30">
                  <h3 className="text-white text-2xl font-bold text-center px-4 font-serif">{category.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

