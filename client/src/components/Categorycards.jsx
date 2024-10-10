import Image from "next/image"

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
    name: "Nature & Wildlife",
    image: "https://www.lukimbi.com/wp-content/uploads/2020/08/IMG_1859.jpg"
  },
  {
    name: "Entertainment",
    image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=500&h=350&fit=crop"
  },
  {
    name: "Scenic View",
    image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=500&h=350&fit=crop"
  },
  {
    name: "Cuisine",
    image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=500&h=350&fit=crop"
  },
]

export default function Categories() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[3/2]">
                <Image
                  src={category.image}
                  alt={`${category.name} category`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-30">
                  <h3 className="text-white text-2xl font-bold text-center px-4">{category.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
